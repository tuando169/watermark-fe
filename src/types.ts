export interface WatermarkOptions {
  type: string;
  font: string;
  content: string;
  position_x: number;
  position_y: number;
  opacity: number;
  size: number;
  color: string;
}

export interface MediaFile {
  _id: string;
  file_name: string;
  file_type: string;
  file_size: number;
  file_path: string;
  width: number;
  height: number;
  description: string;
  watermark_options: WatermarkOptions;
  file_watermarked: string;
  created_at: string;
  updated_at: string;
}

export interface Font {
  _id: string;
  title: string;
  font_name: string;
  file_name: string;
  file_type: string;
  file_size: number;
  file_path: string;
  description: string;
  created_at: string;
  updated_at: string;
}
