import Time "mo:core/Time";
import Order "mo:core/Order";
import Text "mo:core/Text";
import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import Int "mo:core/Int";

actor {
  type ContactMessage = {
    name : Text;
    email : Text;
    subject : Text;
    message : Text;
    timestamp : Time.Time;
  };

  module ContactMessage {
    public func compare(message1 : ContactMessage, message2 : ContactMessage) : Order.Order {
      Int.compare(message1.timestamp, message2.timestamp);
    };
  };

  var nextId = 0;
  let messages = Map.empty<Nat, ContactMessage>();

  // Incremental id generator for entries
  func getNextId() : Nat {
    let res = nextId;
    nextId += 1;
    res;
  };

  public shared ({ caller }) func submitContact(name : Text, email : Text, subject : Text, message : Text) : async Nat {
    let id = getNextId();
    let contactMessage : ContactMessage = {
      name;
      email;
      subject;
      message;
      timestamp = Time.now();
    };
    messages.add(id, contactMessage);
    id;
  };

  public query ({ caller }) func getAllContactMessages() : async [ContactMessage] {
    messages.values().toArray().sort();
  };

  public query ({ caller }) func getMessageById(id : Nat) : async ContactMessage {
    switch (messages.get(id)) {
      case (null) { Runtime.trap("Message not found") };
      case (?message) { message };
    };
  };
};
