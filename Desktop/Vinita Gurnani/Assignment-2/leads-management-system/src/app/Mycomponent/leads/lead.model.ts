// src/app/models/lead.model.ts

export interface Lead {
    leadId: number;
    prospectName: string;
    phone: string;
    email: string;
    college: string;
    course: string;
    applicationForm: string;
    lastOutgoingCallStatus: string;
    lastOutgoingCallAt: string;
    lastActivity: string;
    leadPriority: number;
    instanceType: string;
    leadInstanceSource: string;
    leadType: string;
    leadOwnerAssignmentAge: number;
    leadOwner: string;
  }
  
  export interface LeadApiResponse {
    code: number;
    success: boolean;
    count: number;
    data: Lead[];
  }
  