import SendEmailWhenProductIsCreatedHandler from "../product/handler/send-email-when-product-is-created.handler";
import ProductCreatedEvent from "../product/product-created.event";
import EventDispatcher from "./event-dispatcher";

describe("Domain Events tests", ()=>{
   it("Should register an event handler", ()=>{
      const eventDispatcher = new EventDispatcher();
      const eventHandler = new SendEmailWhenProductIsCreatedHandler();
      eventDispatcher.register("ProductCreatedEvent", eventHandler);
      expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeDefined();
      expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(1);
      expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);
   });
   it("Should unregister an event handler", () =>{
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();
   
        eventDispatcher.register("ProductCreatedEvent", eventHandler);
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);
  
        eventDispatcher.unregister("ProductCreatedEvent", eventHandler);
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(0);

   }); 

   
   it("Should unregister All an event handler", () =>{
      const eventDispatcher = new EventDispatcher();
      const eventHandler = new SendEmailWhenProductIsCreatedHandler();
      const eventHandler1 = new SendEmailWhenProductIsCreatedHandler();
      
 
      eventDispatcher.register("ProductCreatedEvent", eventHandler); 
      eventDispatcher.register("ProductCreatedEvent", eventHandler1);

      
      expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);
      expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][1]).toMatchObject(eventHandler1);


      eventDispatcher.unregisterAll();

      expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeUndefined();


    }); 

   it("Should notify all event handler", ()=>{
      const eventDispatcher = new EventDispatcher();
      const eventHandler = new SendEmailWhenProductIsCreatedHandler();
      const spyEventHandler= jest.spyOn(eventHandler, "handler");

      eventDispatcher.register("ProductCreatedEvent", eventHandler); 

      expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);

      const producttCreatedEvent = new ProductCreatedEvent({
         name: "Product 1",
         description: "Product 1 Description",
         price: 10,
      });

      eventDispatcher.notify(producttCreatedEvent);

      expect(spyEventHandler).toHaveBeenCalled();

   });
});