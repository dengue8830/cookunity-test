import { Trace } from "../../types/trace.model.types";

/**
 * Should be replaced with an ORM and a DB.
 */
export class TraceRepository {
  private items: Trace[];

  constructor(items: Trace[] = []) {
    this.items = items;
  }

  save(model: Trace) {
    this.items.push(model);
  }

  find() {
    return this.items;
  }

  // Should be replaced with a real db query.
  countAndFindFirstDescByQty(): { name: string; qty: number } | undefined {
    const counters: { name: string; qty: number }[] = [];
    this.items.forEach(item => {
      // Simulate sql: group by and count.
      const found = counters.find(counter => counter.name === item.name);
      if (found) {
        found.qty++;
      } else {
        counters.push({ name: item.name, qty: 1 });
      }
    });
    // Simulate sql: order desc and limit 1.
    return counters.sort((a, b) => b.qty - a.qty)[0];
  }

  // Should be replaced with a real db query.
  findFirstDescByDistance(): Trace | undefined {
    // Simulate sql: order desc and limit 1.
    return this.items.sort((a, b) => b.distanceToUsa - a.distanceToUsa)[0];
  }
}
