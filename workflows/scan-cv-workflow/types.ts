export interface ScanCvEvent {
  key: string;
  extension: string;
  nodeExperience?: number;
  cloudExperience?: number;
  itExperience?: number;
  isExcluded?: boolean;
}
