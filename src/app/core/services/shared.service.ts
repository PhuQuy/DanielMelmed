import { Injectable, Output, EventEmitter } from "@angular/core";
import { appointment } from "@app/stork_features/book-massage/model/appointment.model";

@Injectable()
export class SharedService {
    @Output() appointment: EventEmitter<appointment> = new EventEmitter();

    setAppointment(appointment) {
        this.appointment.emit(appointment);
    }
}