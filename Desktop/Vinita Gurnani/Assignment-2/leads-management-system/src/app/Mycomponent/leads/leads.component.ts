// src/app/leads/leads.component.ts

import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { Lead } from './lead.model'; // Ensure this model matches your API response structure

@Component({
  selector: 'app-leads',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatCardModule
  ],
  templateUrl: './leads.component.html',
  styleUrls: ['./leads.component.css']
})
export class LeadsComponent implements OnInit {
  dataSource = new MatTableDataSource<Lead>([]);
  displayedColumns: string[] = [
    'id', 'name', 'phone', 'email', 'college', 'course',
    'applicationForm', 'lastOutgoingCallStatus', 'lastOutgoingCallAt',
    'lastActivity', 'leadPriority', 'instanceType', 'leadInstanceSource',
    'leadType', 'leadOwnerAssignmentAge', 'leadOwner'
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  pageSize = 10;
  currentPage = 1;
  totalRecords = 0;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchLeads();
  }

  fetchLeads() {
    const token = localStorage.getItem('authToken');

    // Set up headers with authorization and additional required headers
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Cache-Control': 'no-cache',
      'Content-Type': 'application/json',
      'Accept': '*/*',
    });

    // Full request body as required by your API
    const body = {
      "id": "",
      "name": "",
      "priority": "",
      "lead_type": "all",
      "isUntouched": 0,
      "source": "",
      "sdate": "",
      "edate": "",
      "uStartDate": "",
      "uEndDate": "",
      "activitySDate": "",
      "activityEndDate": "",
      "user_role": 1,
      "vc": 0,
      "page_no": this.currentPage,
      "limit": 200,
      "type": "",
      "leadStageCreator": "",
      "firstStageLeadAction": "",
      "secondStageLeadAction": "",
      "thirdStageLeadAction": "",
      "fourthStageLeadAction": "",
      "fifthStageLeadAction": "",
      "lastFirstStageLeadAction": "",
      "lastSecondStageLeadAction": "",
      "lastThirdStageLeadAction": "",
      "lastFouthStageLeadAction": "",
      "lastFifthStageLeadAction": "",
      "sub_stage": "",
      "allleadaction": "",
      "clgId": "",
      "sortKey": "lead_times_at",
      "sortOrder": "-1",
      "format": "search",
      "accessAllLeads": 1,
      "state": "",
      "city": "",
      "course": "",
      "stateName": "",
      "cityName": "",
      "courseName": "",
      "category": "",
      "noOfReEnquiry": "",
      "reEnquiryOperation": "",
      "noOfApplicationForm": "",
      "applicationFormOperation": "",
      "lead_score": "",
      "leadScoreOpreation": "",
      "lead_stage_count": "",
      "leadStageCountOpreation": "",
      "recentReEnquiredAtOperation": "",
      "lastReEnquiredAtOperation": "",
      "recentLeadStageAtOperation": "",
      "leadActivityAtOperation": "",
      "createdAtOperation": "",
      "updatedAtOperation": "",
      "leadAssignAtOperation": "",
      "reEnquiredClg": "",
      "lastReEnquiredClg": "",
      "reEnquiredClgSource": "",
      "reEnquiredsdate": "",
      "reEnquirededate": "",
      "reLastEnquiredsdate": "",
      "reLastEnquirededate": "",
      "utmSource": "",
      "utmCampaign": "",
      "utmMedium": "",
      "reEnquiredUtmSource": "",
      "reEnquiredUtmMedium": "",
      "reEnquiredUtmCampaign": "",
      "fw_sdate": "",
      "fw_edate": "",
      "n_id": "",
      "recentLeadStageStartDate": "",
      "recentLeadStageEndDate": "",
      "leadAssigneeStartDate": "",
      "leadAssigneeEndDate": "",
      "oldUserId": "",
      "reAssignedUserId": "",
      "activity_event": "",
      "publisher_tenant_id": "",
      "org_location_name": "",
      "sinceLeadOwnerChange": "",
      "createdAtAgeTimeGap": "",
      "ownerAssignmentAtAgeTimeGap": "",
      "stageCreatedAtAgeTimeGap": " ",
      "primary_source": "",
      "secondary_source": "",
      "tertiary_source": "",
      "last_source": ""
    };

    if (token) {
      this.http.post('https://dev-cc.automateazy.com/api/v1/getLeads', body, { headers })
        .subscribe({
          next: (response: any) => {
            console.log('Response:', response);

            this.totalRecords = response.count;
            const newLeads = response.data || [];
            this.dataSource.data = newLeads; // Set the data directly to the dataSource
            this.dataSource.paginator = this.paginator;
          },
          error: (error) => {
            console.error('Error fetching leads', error);
          }
        });
    } else {
      console.error('No token found. Please log in.');
    }
  }

  onPageChange(event: any) {
    this.currentPage = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.fetchLeads();
  }
}
