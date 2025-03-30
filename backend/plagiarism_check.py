from flask import Blueprint, request, jsonify
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

plagiarism_bp = Blueprint('plagiarism', __name__)

submissions = {}

@plagiarism_bp.route('/upload', methods=['POST'])
def upload_assignment():
    assignment_id = request.form['assignment_id']
    file = request.files['file']
    
    text = file.read().decode('utf-8')

    submissions[assignment_id] = text

    similarity_score = check_plagiarism(text)
    return jsonify({"message": "File uploaded successfully!", "similarity": similarity_score})

def check_plagiarism(new_text):
    if not submissions:
        return 0 

    existing_texts = list(submissions.values())
    vectorizer = TfidfVectorizer().fit_transform([new_text] + existing_texts)
    vectors = vectorizer.toarray()
    
    similarity_matrix = cosine_similarity([vectors[0]], vectors[1:])
    max_similarity = max(similarity_matrix[0]) if similarity_matrix.size > 0 else 0

    return round(max_similarity * 100, 2)
