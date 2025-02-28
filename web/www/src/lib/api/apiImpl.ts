import { join } from "path";
import type { XiorInstance } from "xior";

import { format } from "../format";

export abstract class ApiImpl {
  protected abstract path: string;

  constructor(protected readonly xior: XiorInstance) {}

  protected buildPath(...path: (string | number)[]) {
    return join(
      this.path,
      path.map(String).reduce((a, b) => join(a, b))
    );
  }

  protected buildPathWithQueryString(
    path: string,
    query?: Record<string, unknown>
  ) {
    const q = new URLSearchParams(query as unknown as Record<string, string>);
    return format("%?%", path, q.toString());
  }
}
