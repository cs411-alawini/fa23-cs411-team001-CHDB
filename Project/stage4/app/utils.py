import string
import random


def generate_video_id():
    chars = string.ascii_letters + string.digits

    random_string = ''.join(random.choice(chars) for _ in range(10))

    hash_code = f"_{random_string}"

    return hash_code