# Olo-Technical-Interview-JS

## Background
This is a trial of the Olo SDET interview coding challenge. The goals here are to get an idea of how long this should take and provide a rubric for comparing other Javascript submissions.

## Some Concessions
* This does not execute in parallel as lined out in the requirements, I found it to be unnecessary given the total test execution time is already under 1s.  That said it could easily be accomplished using (mocha-parallel)[https://github.com/mocha-parallel/mocha-parallel-tests].
* Some negative tests were created, but the JSONPlaceholder API is overly forgiving and will accept pretty much any request so in the cases where I think a real API would fail I've noted that in a comment and in one case skipped that test case.

## Getting Started 
### 📋 Prerequisites
* [Node](https://nodejs.org/en/)
* [Yarn](https://classic.yarnpkg.com/en/docs/install/#mac-stable)

### 🚀 Execution
1. Install packages via `yarn install` (you only need to do this once)
2. Run Tests `yarn test` (this can be done as many times as you like)

## 🎉 Conclusion
This exercise took me about 3 hours (but I wasted some time switching from `Got` to `Node-Fetch` after I realized the documentation sucks for `GOT`, I also never got the debugger in VSCode to correctly hit break points 😤).

I found JSONPlaceHolder to be easy to work with, but also limited.  It's a bit too simple to drive decisions on frameworks.  I broke everything into two files, tests and requests. I would have liked to flex my framework building skills, but doing more then I did is unnecessary abstraction (which we also don't want).