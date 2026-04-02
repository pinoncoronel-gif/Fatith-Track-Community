class Audio:
    def __init__(self, audio_id, title, file_path, user_id, created_at):
        self.audio_id = audio_id
        self.title = title
        self.file_path = file_path
        self.user_id = user_id
        self.created_at = created_at

    def __repr__(self):
        return f'<Audio {self.title} (ID: {self.audio_id})>'