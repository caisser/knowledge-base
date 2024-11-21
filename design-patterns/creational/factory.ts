/* provides an interface for creating objects in a superclass, but allows subclasses to alter the type of objects that will be created.
solves the problem of creating product objects without specifying their concrete classes.
The Factory Method defines a method, which should be used for creating objects instead of using a direct constructor call (new operator). 
Subclasses can override this method to change the class of objects that will be created.
*/

/**
 * The Creator class declares the factory method that is supposed to return an
 * object of a Product class. The Creator's subclasses usually provide the
 * implementation of this method.
 */
abstract class TransportCreator {
  /**
   * Note that the Creator may also provide some default implementation of the
   * factory method.
   */
  public abstract factoryMethod(): Transport;

  /**
   * Also note that, despite its name, the Creator's primary responsibility is
   * not creating products. Usually, it contains some core business logic that
   * relies on Product objects, returned by the factory method. Subclasses can
   * indirectly change that business logic by overriding the factory method
   * and returning a different type of product from it.
   */
  public someOperation(): string {
    // Call the factory method to create a Product object.
    const transport = this.factoryMethod();
    // Now, use the product.
    return `TransportCreator: The same creator's code has just worked with ${transport.operation()}`;
  }
}

/**
 * Concrete Creators override the factory method in order to change the
 * resulting product's type.
 */
class TruckCreator extends TransportCreator {
  /**
   * Note that the signature of the method still uses the abstract product
   * type, even though the concrete product is actually returned from the
   * method. This way the Creator can stay independent of concrete product
   * classes.
   */
  public factoryMethod(): Transport {
    return new Truck();
  }
}

class ShipCreator extends TransportCreator {
  public factoryMethod(): Transport {
    return new Ship();
  }
}

/**
 * The Product interface declares the operations that all concrete products must
 * implement.
 */
interface Transport {
  operation(): string;
}

/**
 * Concrete Products provide various implementations of the Product interface.
 */
class Truck implements Transport {
  public operation(): string {
    return '{Transport by land}';
  }
}

class Ship implements Transport {
  public operation(): string {
    return '{Transport by sea}';
  }
}

/**
 * The client code works with an instance of a concrete creator, albeit through
 * its base interface. As long as the client keeps working with the creator via
 * the base interface, you can pass it any creator's subclass.
 */
function clientCode(creator: TransportCreator) {
  // ...
  console.log(
    "Client: I'm not aware of the creator's class, but it still works."
  );
  console.log(creator.someOperation());
  // ...
}

/**
 * The Application picks a creator's type depending on the configuration or
 * environment.
 */
console.log('App: Launched with the TruckCreator.');
clientCode(new TruckCreator());
console.log('');

console.log('App: Launched with the ShipCreator.');
clientCode(new ShipCreator());
