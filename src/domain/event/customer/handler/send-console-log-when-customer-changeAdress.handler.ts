import EventHandlerInterface from "../../@shared/event-handler.interface";
import CustomerChangeAdressEvent from "../customer-changeAdress.event";
import CustomerCreatedEvent from "../customer-created.event";

export default class EnviaConsoleLogHandler implements EventHandlerInterface<CustomerChangeAdressEvent> {
    handler(event: CustomerChangeAdressEvent): void {
      console.log("Endereço do cliente:", event.eventData.id, event.eventData.name, "alterado para: ", event.eventData.endereco);
    }

}