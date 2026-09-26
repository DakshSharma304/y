# Y Not Study
### Note: This is what Y Not Study WILL be. It is currently in development.
Y Not Study is an adaptive study app designed to learn about both you and the instructor over time.

Capabilities:
- **Material Uploading** - The model ingests the notes, packets, assignments, and even practice tests that you provide it, so your studying in our app is never behind your classroom progress
- **Algorithm** - Generates and chooses questions through priority weighting based on factors such as mastery, weaknesses, and spaced repetition
- **Long term self-improvement via class-specific generic memory** - Stores long term trends and patterns locally, such as how tests tend to be in a class, and uses those to adapt to the class over time, allowing generated questions and other things to be more accurate
- **Long term self-improvement via student-specific memory** - learns how the student studies, what they struggle with, and other information, allowing it to better teach and adapt to their unique learning style

# Implementation Log
## NinjazGY2497 (gyagau)
### Sunday, Sept 20 (Week 1)
- Backend: Got a basic express.js server up and running (including health endpoint and 404)
- Backend: Basic username and password register system (with endpoints)
- Backend: Hashing for the passwords (using scryptSync)
- Backend: Login system (with endpoint) (compares hashes)
- Backend: Changed it so backend serves the frontend
- Backend: Session token creation and storage
- Backend: Session token validation and logout endpoint (with the middleware func, usable on any endpoint)
- Backend: Session token expiration (30 days)
- Frontend: Hooked up frontend login page with backend login endpoints
- Frontend: Hooked up frontend registration page with backend registration endpoints
- Frontend: Adding/uploading materials feature

## DakshSharma304 (dakshsharmanj)
### is this necessary i do ui/ux and conceptual work