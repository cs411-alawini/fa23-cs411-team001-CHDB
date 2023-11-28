from . import app
from flask import request, jsonify, render_template
from . import database as db_helper


@app.route("/")
def homepage():
    return jsonify({"status": "OK"})

@app.route('/videos', methods=['GET'])
def check_videos():
        items = db_helper.fetch_videos()
        return jsonify(items)
@app.route('/videos/insert', methods=['POST'])
def insert_video():
    data = request.get_json()
    ret_val = db_helper.insert_new_video(data['Title'], data['Channel_Id'], data['Category_Id'], data['Tag_Name'], data['Publish_time'])
    if ret_val:
        return jsonify({"success": True, "response": "Done"})
    else:
        return jsonify({"success": False, "response": "Insertion failed"})

@app.route('/videos/delete/<string:video_id>', methods=['DELETE'])
def delete_video(video_id):
    ret_val = db_helper.remove_video_by_id(video_id)
    if ret_val:
        return jsonify({"success": True, "response": "Done"})
    else:
        return jsonify({"success": False, "response": "Deletion failed"})