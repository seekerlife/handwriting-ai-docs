export type ErrorDetail = {
  field?: string;
  code: string;
};

export type ErrorBody = {
  code: string;
  message: string;
  request_id?: string;
  details?: ErrorDetail[];
  limit?: number;
  used?: number;
  reset_at?: string;
  retry_after?: number;
};

export type PageSize =
  | "letter"
  | "legal"
  | "tabloid"
  | "a3"
  | "a4"
  | "a5"
  | "a6"
  | "b5"
  | "india-18x24"
  | "postcard-4x6"
  | "card-5x7"
  | "square";

export type Paper =
  | "plain"
  | "college-ruled"
  | "wide-ruled"
  | "feint-ruled"
  | "grid"
  | "squared-10mm"
  | "india-school-single-line"
  | "india-school-square"
  | "india-college-single-line"
  | "lineatur-25"
  | "lineatur-27"
  | "lineatur-28"
  | "cis-school-grid"
  | "cis-school-line"
  | "dots"
  | "memo";

export type Realism = "off" | "subtle" | "natural" | "realistic" | "lifelike";

export type MarginsMm = {
  top: number;
  right: number;
  bottom: number;
  left: number;
};

export type RealismAdvanced = {
  word_placement?: number;
  line_starts?: number;
  line_spacing?: number;
  ink_flow?: number;
  ink_texture?: number;
  letterform_variation?: number;
  tilt_each_letter?: boolean;
};

export type PageLook = {
  paper_texture?: number;
  paper_texture_style?: "fine" | "fiber" | "laid";
  shading?: number;
  soft_focus?: number;
};

export type RenderOutput = {
  format?: "jpeg" | "png" | "pdf";
  dpi?: 150 | 300 | 600;
  background?: "paper" | "transparent";
};

export type RenderRequest = {
  text: string;
  font_id?: string;
  font_size_pt?: number | "auto";
  max_font_size_pt?: number;
  page_size?: PageSize;
  orientation?: "portrait" | "landscape";
  paper?: Paper;
  tint?: "white" | "cream" | "aged" | "dark";
  grid_size?: "small" | "large";
  alignment?: "left" | "center" | "right";
  direction?: "auto" | "ltr" | "rtl";
  margins_mm?: MarginsMm;
  line_height?: number;
  paragraph_spacing_mm?: number;
  letter_spacing_mm?: number;
  word_spacing_mm?: number;
  pen_weight?: number;
  ink?: string;
  realism?: Realism;
  realism_advanced?: RealismAdvanced;
  page_look?: PageLook;
  seed?: number;
  output?: RenderOutput;
};

export type DownloadOptions = {
  signal?: AbortSignal;
};

export type Downloadable = {
  url: string;
  download: (options?: DownloadOptions) => Promise<Uint8Array>;
  save: (filePath: string) => Promise<void>;
};

export type RenderPage = Downloadable & {
  page: number;
  width: number;
  height: number;
  media_type: "image/jpeg" | "image/png";
};

export type RenderFile = Downloadable & {
  media_type: "application/pdf";
};

export type RenderResult = {
  request_id: string;
  seed: number;
  font_id: string;
  font_size_pt: number;
  page_count: number;
  unsupported_characters: string[];
  expires_at: string;
  pages?: RenderPage[];
  file?: RenderFile;
};

export type StatusResult = {
  status: "ok";
  version: string;
};

export type CallOptions = {
  signal?: AbortSignal;
  requestId?: string;
};
