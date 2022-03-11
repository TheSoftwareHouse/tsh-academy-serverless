export interface ScanCvEvent {
  key: string;
  extension: string;
  nodeExperience?: number;
  cloudExperience?: number;
  itExperience?: number;
  isExcluded?: boolean;
}

export interface ScanCvScoreEvent {
  key: string;
  extension: string;
  calculatedScore: number;
  matchedFilesBucketName: string;
  rejectedFilesBucketName: string;
  copySource: string;
}
