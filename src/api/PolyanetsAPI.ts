import type { Polyanet } from "../domain/entities/Polyanets";
import type { ServiceConfig } from "../interfaces/interfaces";


class PolyanetError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "PolyanetError";
  }
}

interface IPolyanetAPI {
  createPolyanet: (polyanet: Polyanet) => Promise<void>;
  deletePolyanet: (polyanet: Polyanet) => Promise<void>;
}

export class PolyanetsAPI implements IPolyanetAPI {
  constructor(
    private readonly config: ServiceConfig
  ) {}

  /**
   * Creates a polyanet at the specified coordinates
   * @param polyanet - The polyanet to be created
   * @throws PolyanetError if creating the polyanet fails
   */
  public async createPolyanet(polyanet: Polyanet): Promise<void> {
    try {
      const url = `${this.config.apiBaseUrl}/polyanets`;
      const body = {
        row: polyanet.coordinates.row,
        column: polyanet.coordinates.column,
        candidateId: this.config.candidateId,
      };
      const response = await this.config.axiosInstance.post(url, body);
      await response.data;
    } catch (error) {
      console.error(error);
      throw new PolyanetError(
        `Failed to create polyanet at coordinates (${polyanet.coordinates.row}, ${polyanet.coordinates.column}): ${error}`
      );
    }
  }

  /**
   * Deletes a polyanet at the specified coordinates
   * @param polyanet - The polyanet to be deleted
   * @throws PolyanetError if deleting the polyanet fails
   */
  public async deletePolyanet(polyanet: Polyanet): Promise<void> {
    try {
      const url = `${this.config.apiBaseUrl}/polyanets`;
      const body = {
        row: polyanet.coordinates.row,
        column: polyanet.coordinates.column,
        candidateId: this.config.candidateId,
      };
      const response = await this.config.axiosInstance.delete(url, { data: body });
      await response.data;
    } catch (error) {
      console.error(error);
      throw new PolyanetError(
        `Failed to delete polyanet at coordinates (${polyanet.coordinates.row}, ${polyanet.coordinates.column}): ${error}`
      );
    }
  }
}

