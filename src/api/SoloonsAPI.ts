import type { Soloon } from "../domain/entities/Soloons";
import type { ServiceConfig } from "../interfaces/interfaces";


class SoloonsError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "SoloonsError";
  }
}

interface ISoloonsAPI {
  createSoloons: (soloon: Soloon) => Promise<void>;
  deleteSoloons: (soloon: Soloon) => Promise<void>;
}

export class SoloonsAPI implements ISoloonsAPI {
  constructor(
    private readonly config: ServiceConfig
  ) {}

  /**
   * Creates a soloons at the specified coordinates with the given color
   * @param soloon - The soloon to be created
   * @throws Error if creating the soloons fails
   */
  public async createSoloons(soloon: Soloon): Promise<void> {
    try {
      const url = `${this.config.apiBaseUrl}/soloons`;
      const body = {
        row: soloon.coordinates.row,
        column: soloon.coordinates.column,
        color: soloon.color,
        candidateId: this.config.candidateId,
      };
      const response = await this.config.axiosInstance.post(url, body);
      await response.data;
    } catch (error) {
      console.error(error);
      throw new SoloonsError(
        `Failed to create soloons at coordinates (${soloon.coordinates.row}, ${soloon.coordinates.column}): ${error}`
      );
    }
  }

  /**
   * Deletes a soloons at the specified coordinates
   * @param soloon - The soloon to be deleted
   * @throws Error if deleting the soloons fails
   */
  public async deleteSoloons(soloon: Soloon): Promise<void> {
    try {
      const url = `${this.config.apiBaseUrl}/soloons`;
      const body = {
        row: soloon.coordinates.row,
        column: soloon.coordinates.column,
        candidateId: this.config.candidateId,
      };
      const response = await this.config.axiosInstance.delete(url, { data: body });
      await response.data;
    } catch (error) {
      console.error(error);
      throw new SoloonsError(
        `Failed to delete soloons at coordinates (${soloon.coordinates.row}, ${soloon.coordinates.column}): ${error}`
      );
    }
  }
}

