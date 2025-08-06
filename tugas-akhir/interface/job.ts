export interface JobResponse {
  id:string
  title: string;
  job_position: string;
  company: string;
  employment_type: string;
  description: string;
  close_at: Date;
}
export interface JobRequestCreate {
  title: string;
  job_position: string;
  company: string;
  employment_type: string;
  description: string;
  close_at: Date;
}
export interface JobRequestUpdate {
  title: string;
  job_position: string;
  company: string;
  employment_type: string;
  description: string;
  close_at: Date;
}