from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from database import db
from models import Assignment, User


  # Ensure User model exists

assignments_bp = Blueprint("assignments", __name__)

@assignments_bp.route("/dashboard", methods=["GET"])
@jwt_required()
def get_assignments():
    try:
        current_user = get_jwt_identity()  # Get user ID from token
        print(f"Decoded JWT User ID: {current_user}")  # Debugging log

        assignments = (
            db.session.query(
                Assignment.id,
                Assignment.subject,
                User.email.label("teacher"),
                Assignment.marks
            )
            .join(User, Assignment.teacher_id == User.id)
            .all()
        )

        assignment_list = [
            {"id": a.id, "subject": a.subject, "teacher": a.teacher, "marks": a.marks}
            for a in assignments
        ]

        return jsonify(assignment_list), 200
    except Exception as e:
        print(f"Error in get_assignments: {str(e)}")
        return jsonify({"error": "Failed to fetch assignments"}), 500
