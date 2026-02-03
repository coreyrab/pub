export interface ArtifactMeta {
  artifact_id: string;
  content_type: string;
  created_at: string; // ISO 8601
  expires_at: string; // ISO 8601
  size_bytes: number;
  og_title?: string;
  og_description?: string;
  pinned?: boolean;
}

export interface PublishRequest {
  content: string;
  content_type?: string;
  ttl_seconds?: number;
  pinned?: boolean;
}

export interface PublishResponse {
  artifact_id: string;
  url: string;
  expires_at: string;
  content_type: string;
  pinned?: boolean;
}
