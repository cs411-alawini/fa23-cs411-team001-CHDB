import string
import random
from . import db
from flask import jsonify, make_response

def generate_video_id():
    chars = string.ascii_letters + string.digits

    random_string = ''.join(random.choice(chars) for _ in range(10))

    hash_code = f"_{random_string}"

    return hash_code
def insert_new_video(Title, Channel_Id, Category_Id, Tag_Name, Publish_time) -> bool:
    conn = db.connect()
    query = f'INSERT INTO Video (Video_id, Title, Channel_Id, Category_Id, Tag_Name, Publish_time) VALUES ("{generate_video_id()}", "{Title}", "{Channel_Id}", "{Category_Id}", "{Tag_Name}", "{Publish_time}");'
    try:
        conn.execute(query)
    except Exception as e:
        conn.close()
        return make_response({"success": False, "response": f"{e}"}, 400)
    conn.close()
    return make_response({"success": True, "response": "Done"}, 200)


def fetch_videos():
    conn = db.connect()
    query = 'SELECT * FROM Video;'
    query_results = conn.execute(query)
    conn.close()
    ret_res = []
    for result in query_results:
        item = {
            "Video_id": result[0],
            "Title": result[1],
            "Channel_Id": result[2],
            "Category_Id": result[3],
            "Tag_Name": result[4],
            "Publish_time": result[5]
        }
        ret_res.append(item)
    return make_response(jsonify(ret_res), 200)


def remove_video_by_id(video_id):
    conn = db.connect()
    query = f'DELETE FROM Video WHERE Video_id = "{video_id}";'
    try:
        conn.execute(query)
    except Exception as e:
        conn.close()
        return make_response({"success": False, "response": f"{e}"}, 400)
    conn.close()
    return make_response({"success": True, "response": "Done"}, 200)


def update_video_by_id(video_id, inp):
    conn = db.connect()
    original_data = conn.execute(f'SELECT * FROM Video WHERE Video_id = "{video_id}";')
    if original_data is None:
        return make_response({"success": False, "response": "Video not found"}, 400)
    original_data_dict = original_data.mappings().all()[0]
    title = inp.get('Title', original_data_dict["Title"])
    tag_name = inp.get('Tag_Name', original_data_dict["Tag_Name"])
    publish_time = inp.get('Publish_time', original_data_dict["Publish_time"])
    query = f'UPDATE Video SET Title = "{title}", Tag_Name = "{tag_name}", Publish_time = "{publish_time}" WHERE Video_id = "{video_id}";'
    try:
        conn.execute(query)
    except Exception as e:
        conn.close()
        return make_response({"success": False, "response": f"{e}"}, 400)
    conn.close()
    return make_response({"success": True, "response": "Done"}, 200)


def search_video_by_title(Title):
    conn = db.connect()
    query = f"SELECT * FROM Video WHERE Title LIKE '%%{Title}%%';"
    ret_res = []
    try:
        query_results = conn.execute(query)
        for result in query_results:
            item = {
                "Video_id": result[0],
                "Title": result[1],
                "Channel_Id": result[2],
                "Category_Id": result[3],
                "Tag_Name": result[4],
                "Publish_time": result[5]
            }
            ret_res.append(item)
    except Exception as e:
        conn.close()
        return make_response({"success": False, "response": f"{e}"}, 400)
    return make_response(jsonify(ret_res), 200)


def video_view(video_id):
    conn = db.connect()
    query = (f"SELECT n.NationName, SUM(v.Likes), SUM(v.Dislikes), SUM(v.Views), MAX(v.Trending_date), MAX(total_views.totalview) "
             f"FROM View v "
             f"JOIN Nation n ON v.Nationid = n.Nationid "
             f"JOIN (SELECT SUM(Views) AS totalview FROM View WHERE Video_id = '{video_id}') total_views "
             f"WHERE v.Video_id = '{video_id}' "
             f"GROUP BY v.Nationid; ")
    ret_res = []
    try:
        query_results = conn.execute(query)
        for result in query_results:
            item = {
                "NationName": result[0],
                "Likes": str(result[1]),
                "Dislikes": str(result[2]),
                "Nation_Views": str(result[3]),
                "Trending_date": result[4],
                "Total_Views": str(result[5])
            }
            ret_res.append(item)
    except Exception as e:
        conn.close()
        return make_response({"success": False, "response": f"{e}"}, 400)
    conn.close()
    return make_response(jsonify(ret_res), 200)


def allnationtopn(n):
    conn = db.connect()
    procedure_query = f"CALL GetAllNationsTopn({n});"
    retrieve_query = (f"SELECT a.Title, a.TotalViews, n.NationName "
                      f"FROM AllNationTopnTable a "
                      f"JOIN Nation n ON a.Nationid = n.Nationid;")
    try:
        conn.execute(procedure_query)
        query_results = conn.execute(retrieve_query)
        ret_res = []
        for result in query_results:
            item = {
                "Title": result[0],
                "TotalViews": str(result[1]),
                "NationName": result[2]
            }
            ret_res.append(item)
    except Exception as e:
        conn.close()
        return make_response({"success": False, "response": f"{e}"}, 400)
    conn.close()
    return make_response(jsonify(ret_res), 200)
