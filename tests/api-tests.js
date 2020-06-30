const expect = require('chai').expect;
const api = require('../src/api-requests');
const { fail } = require('assert');

describe('Typicode API Tests', () => {

    before(() => {});

    after(() => {});

    it('Can get first post', async () => {
        const response = await api.getPost(1).catch(err => fail(err.message));
        const post = await response.json();

        expect(response.status).to.equal(200);
        expect(post).has.property('id');
        expect(post).has.property('title');
        expect(post).has.property('body');
        expect(post).has.property('userId');
    });

    it('Can get many posts', async () => {
        const response = await api.getAllPosts().catch(err => fail(err.message));
        const posts = await response.json();

        expect(response.status).to.equal(200);
        expect(response.body).to.not.be.empty;
        expect(posts).length.greaterThan(1);
        expect(posts[0]).has.property('id');
        expect(posts[0]).has.property('title');
        expect(posts[0]).has.property('body');
        expect(posts[0]).has.property('userId');
    });

    it('Can create basic post', async () => {
        const newPost = {
            title: `A Test Post on ${new Date().toUTCString()}`,
            body: 'This is a test post created from an automated test',
            userId: 1
        }
        const response = await api.createPost(newPost).catch(err => fail(err.message));
        const post = await response.json();

        expect(response.status).to.equal(201);
        expect(post.title).to.equal(newPost.title);
        expect(post.body).to.equal(newPost.body);
        expect(post.userId).to.equal(newPost.userId);
        expect(post).to.have.property('id');
    });

    it('Cannot create post without a title', async () => {
        const newPost = {
            body: 'This is a test post created from an automated test',
            userId: 1
        }
        const response = await api.createPost(newPost).catch(err => fail(err.message));

        // I would expect this to fail, but their API is perhaps too permissive?
        expect(response.status).to.equal(201);
    });

    it('Post was not really created', async () => {
        const post = await api.createPost({
            title: `A Test Post on ${new Date().toUTCString()}`,
            body: 'This is a test post created from an automated test',
            userId: 1
        });
        const response = await api.getPost(post.id).catch(err => fail(err.message));
        
        expect(response.status).to.equal(404);
    });

    it('Can update an existing post', async () => {
        const changes = {
            title: `This Post was Updated on ${new Date().toUTCString()}`,
            body: 'Any and all fields can be updated',
            userId: 2
        };
        const response = await api.updatePost(99, changes).catch(err => fail(err.message));
        const post = await response.json();

        expect(response.ok).to.be.ok;
        expect(response.status).to.equal(200);
        expect(post.id).to.equal(99);
        expect(post.title).to.equal(changes.title);
        expect(post.body).to.equal(changes.body);
        expect(post.userId).to.equal(changes.userId);
    });

    it('Cannot update a non-existing post', async () => {
        const changes = {
            title: `This Post was Updated on ${new Date().toUTCString()}`,
            body: 'Should not be able to delete a non-existing post',
            userId: 3
        };
        const response = await api.updatePost(9999, changes).catch(err => fail(err.message));


        expect(response.ok).to.not.be.ok;
        expect(response.statusText).to.equal('Internal Server Error');
    });

    it('Can delete an existing post', async () => {
        const response = await api.deletePost(8).catch(err => fail(err.message));
        const post = await response.json();
        const response2 = await api.getPost(8).catch(err => fail(err.message));

        expect(response).to.be.ok;
        expect(post).to.be.empty;
        
        // if this was not faked I would expect this to fail
        expect(response2.ok).to.be.ok;
    });

    xit('Cannot delete a non-existing post', async () => {
        const response = await api.deletePost(99999).catch(err => fail(err.message));

        //This passes but should probably fail
        expect(response).to.not.be.ok;
    });
});