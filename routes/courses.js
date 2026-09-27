import { Router } from "express"
import { db } from "../config/db.js"
import { requireAuth } from "./auth.js"

const router = Router();

// GET /api/courses - List all the user's courses
router.get("/", requireAuth, async (req, res) => {
    try {
        const result = await db.execute({
            sql: "SELECT id, name, created_at FROM courses WHERE user_id = ? ORDER BY created_at DESC",
            args: [req.user.id]
        })

        return res.json({courses: result.rows})
    } catch (e) {
        console.error("Error occurred while fetching courses: " + e)
        return res.status(500).json({error: "Failed to fetch courses"})
    }
})

// GET /api/courses/:id - Gets a single course
router.get("/:id", requireAuth, async (req, res) => {
    try {
        const courseId = req.params.id;

        // Request for course, and make sure it matches both course ID AND user_id (because courses are not Unlisted)
        const result = await db.execute({
            sql: "SELECT id, name, created_at FROM courses WHERE id = ? AND user_id = ?",
            args: [courseId, req.user.id]
        })

        // Make sure a course was found; if not, return 404
        if (result.rows.length === 0) {
            return res.status(404).json({error: "Course not found"})
        }

        return res.json({course: result.rows[0]})

    } catch (e) {
        console.error("Error occurred while fetching a course: " + e)
        return res.status(500).json({error: "Failed to fetch course details"})
    }
})

// POST /api/courses - Create a new course
router.post("/", requireAuth, async (req, res) => {
    try {
        let { name } = req.body

        name = name?.trim() // Clean the name

        // Make sure a name has been given
        if (!name) {
            return res.status(400).json({error: "Course name is required"})
        }

        const createdAt = Date.now()

        // --- Add course to DB ---
        const result = await db.execute({
            sql: "INSERT INTO courses (user_id, name, created_at) VALUES (?, ?, ?) RETURNING id, name, created_at",
            args: [req.user.id, name, createdAt]
        })

        return res.status(201).json({
            message: "Course created successfully",
            course: result.rows[0]
        })
    } catch (e) {
        console.error("Error occurred while creating the course: " + e)
        return res.status(500).json({error: "Failed to create course"})
    }
})

// PUT /api/courses/:id - Update/rename a course
router.put("/:id", requireAuth, async (req, res) => {
    try {
        const courseId = req.params.id;
        let { name } = req.body

        name = name?.trim() // Clean the name

        // Make sure a new name has been given
        if (!name) {
            return res.status(400).json({error: "Course name is required"})
        }

        // Update course name, and make sure BOTH the course id AND user id match (to prevent unauthorized course updating)
        const result = await db.execute({
            sql: "UPDATE courses SET name = ? WHERE id = ? AND user_id = ? RETURNING id, name, created_at",
            args: [name, courseId, req.user.id]
        })

        // See if it was successful (if any matching rows were found)
        if (result.rows.length === 0) {
            return res.status(404).json({error: "Course not found"})
        }

        return res.json({message: "Course updated successfully", course: result.rows[0]})

    } catch (e) {
        console.error("Error occurred while updating course: " + e)
        return res.status(500).json({error: "Failed to update course"})
    }
})

// DELETE /api/courses/:id - Deletes a single course
router.delete("/:id", requireAuth, async (req, res) => {
    try {
        const courseId = req.params.id;

        // Request for course, and make sure it matches both course ID AND user_id (because we don't want somebody unauthorized to delete our course)
        const result = await db.execute({
            sql: "DELETE FROM courses WHERE id = ? AND user_id = ?",
            args: [courseId, req.user.id]
        })

        // Make sure the course was actually deleted; if not, 404
        if (result.rowsAffected === 0) {
            return res.status(404).json({error: "Course not found"})
        }

        return res.json({message: "Course deleted successfully"})

    } catch (e) {
        console.error("An error occurred while deleting the course: " + e)
        return res.status(500).json({error: "Failed to delete course"})
    }
})

export default router