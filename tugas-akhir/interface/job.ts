export interface JobResponse {
  id:string
  job_position: string
  type_of_workplace:string
  job_location:string
  company: string
  employment_type: string
  description: string
  close_at: Date
}
export interface JobRequestCreate {
  job_position: string
  type_of_workplace:string
  job_location:string
  company: string
  employment_type: string
  description: string
  close_at: Date
}
export interface JobRequestUpdate {
  job_position: string
  type_of_workplace:string
  job_location:string
  company: string
  employment_type: string
  description: string
  close_at: Date
}