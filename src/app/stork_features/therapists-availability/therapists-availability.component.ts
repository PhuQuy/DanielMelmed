import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
// import "dhtmlx-scheduler";
// import {} from "@types/dhtmlxscheduler";
import { IOption } from 'ng-select';
import * as $ from 'jquery';
import 'moment';
import 'fullcalendar';
import 'fullcalendar-scheduler';
import * as env from 'environments/environment';
import { TherapistAvailabilityService } from './therapist-availability.service';


@Component({
  selector: 'app-therapists-availability',
  templateUrl: './therapists-availability.component.html',
  styleUrls: ['./therapists-availability.component.scss'],
  providers: [TherapistAvailabilityService]
})
export class TherapistsAvailabilityComponent implements OnInit {
  fc: object;
  myOptions: Array<IOption> = [
    { label: 'Netherlands', value: 'BE' },
    { label: 'abc', value: 'LU' },
    { label: 'Luxembourg', value: 'NL' }
  ];

  constructor(private therapistAvailabilityService: TherapistAvailabilityService) { }

  //@ViewChild("scheduler") schedulerContainer: ElementRef;

  ngOnInit() {
    // scheduler.init(this.schedulerContainer.nativeElement, new Date());
    this.getAvailableTherapist(new Date());
    // this.createscheduler();
  }
 


  createscheduler(resources, events) {
    // $('body').on('click', 'button.fc-prev-button', function () {
    //   var b = $('#calendar').fullCalendar('getDate');
    //   alert(b.format('L'));
    //   this.getAvailableTherapist(b.format('L'));
    // });

    let containerEl: JQuery = $('#calendar');
    $('#calendar').fullCalendar({
      editable: true,
      selectable: true,
      // Availability: true,
      header: {
        left: 'prev,next today',
        center: 'title'
        // right: 'month,agendaWeek,agendaDay,agendaTwoDay'

      },
      defaultDate: new Date(),
      defaultView: 'agendaDay',
      eventBackgroundColor: "#90EE90",
      minTime: env.environment.fullcalender_minTime,
      maxTime: env.environment.fullcalender_maxTime,
      allDaySlot: false,
      views: {
        agendaTwoDay: {
          type: 'agenda',
          duration: { days: 2 },
          // views that are more than a day will NOT do this behavior by default
          // so, we need to explicitly enable it
          groupByResource: true,
          //// uncomment this line to group by day FIRST with resources underneath
          // groupByDateAndResource: true
        }
      },
      viewRender: function (view, element) {
        var b = $('#calendar').fullCalendar('getDate');
        //this.getAvailableTherapist(b);
      },
      resources: resources,
      events: events
    });

  }

  getAvailableTherapist(start_date: Date) {
    this.therapistAvailabilityService.get_all_available_therapist(start_date).subscribe(data => {
      //debugger;
      const resources = [], events = [];
      if (data.ResponseDetails.ResponseStatus == '10' && data.ResponseMessage.availability.length > 0) {
        let availabile = data.ResponseMessage.availability;
        for (let i = 0; i < availabile.length; i++) {
          if (availabile[i].therapist != null) {
            let itemresource = {
              id: availabile[i].therapist._id,
              therapistId: availabile[i].therapist._id,
              title: availabile[i].therapist.firstname + " " + availabile[i].therapist.lastname
            };

            resources.push(itemresource);

            let itemevent = {
              id: availabile[i]._id,
              resourceId: availabile[i].therapist._id,
              title: availabile[i].notes,
              start: new Date(availabile[i].start_date),
              end: new Date(availabile[i].end_date)
            };
            events.push(itemevent);
          }
        }
        this.createscheduler(resources, events);
      }
      this.createscheduler(resources, events);
    })
  }
}



