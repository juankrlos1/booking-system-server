export interface AreaResponse {
  id: number;
  name: string;
  description?: string;
  departmentId: number;
  departmentName: string;
  createdAt: Date;
  createdBy?: string;
  updatedAt?: Date;
  updatedBy?: string;
}
