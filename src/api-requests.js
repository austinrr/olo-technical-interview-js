const fetch = require('node-fetch');

const prefix = 'https://jsonplaceholder.typicode.com';
const defaultHeaders = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'User-Agent': 'node-fetch/jsonplaceholder-tests'
}
const requestMethods = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    PATCH: 'PATCH',
    DELETE: 'DELETE'
}

/**
 * Throws back a fetch-error or logs a system error
 * @param {Error} err 
 */
async function errorHandler(err) {
    if (err instanceof fetch.FetchError) {
        // bubble up response errors
        throw err;
    }
    else {
        // internal error, check the request build logic
        console.error(err);
        return false;
    }
}

/**
 * Gets a post by id
 * @param {*} id 
 */
async function getPost(id) {
    try {
        return await fetch(`${prefix}/posts/${id}`, {
            method: requestMethods.GET,
            headers: defaultHeaders.defaultHeaders
        });
    } catch (err) {
        return errorHandler(err);
    }
}

/**
 * Gets all available posts (not paginated)
 */
async function getAllPosts() {
    try {
        return await fetch(`${prefix}/posts`, {
            method: requestMethods.GET,
            headers: defaultHeaders
        });
    } catch (err) {
        errorHandler(err);
    }
}

/**
 * Simulates creating a post with supplied JSON.
 * Note: this does not actually create a post it's faked by JSONPlaceHolder
 * @param {*} post 
 */
async function createPost(post = {title, body, userId}) {
    try {
        return await fetch(`${prefix}/posts`, {
            method: requestMethods.POST,
            body: JSON.stringify(post),
            headers: defaultHeaders
        });
    } catch (err) {
        errorHandler(err);
    }
}

/**
 * Simulates updating an existing post with supplied JSON data
 * Hint: don't include a property if you want it to remain unchanged, setting it to NUll or UNDEFINED will set it as such
 * Note: this does not actually update a post, it's faked by JSONPlaceHolder
 * @param {*} id 
 * @param {*} post 
 */
async function updatePost(id, post = {title, body, userId}) {
    try {
        return await fetch(`${prefix}/posts/${id}`, {
            method: requestMethods.PUT,
            body: JSON.stringify(post),
            headers: defaultHeaders
        });

    } catch (err) {
        errorHandler(err);
    }
}

/**
 * Deletes an existing post by given id
 * Note: does not actually delete a post, it's faked by JSONPlaceHolder
 * @param {*} id 
 */
async function deletePost(id) {
    try {
        return await fetch(`${prefix}/posts/${id}`, {
            method: requestMethods.DELETE,
            headers: defaultHeaders
        });
    } catch (err) {
        errorHandler(err);
    }
}

// export the api functions
module.exports = {
    getPost,
    getAllPosts,
    createPost,
    updatePost,
    deletePost
}