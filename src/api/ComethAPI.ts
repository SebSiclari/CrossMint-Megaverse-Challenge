import type { ServiceConfig } from "../interfaces/interfaces";
import type { Cometh } from "../domain/entities/Cometh";

class ComethError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ComethError";
  }
}

interface IComethAPI {
  createCometh: (cometh: Cometh) => Promise<void>;
  deleteCometh: (cometh: Cometh) => Promise<void>;
}

export class ComethAPI implements IComethAPI {
  constructor(
    private readonly config: ServiceConfig
  ) {}

  /**
   * Creates a cometh at the specified coordinates with the given direction
   * @param cometh - The cometh to be created
   * @throws ComethError if creating the cometh fails
   */
  public async createCometh(cometh: Cometh): Promise<void> {
    try {
      const url = `${this.config.apiBaseUrl}/comeths`;
      const body = {
        row: cometh.coordinates.row,
        column: cometh.coordinates.column,
        direction: cometh.direction,
        candidateId: this.config.candidateId,
      };
      const response = await this.config.axiosInstance.post(url, body);
      await response.data;
    } catch (error) {
      console.error(error);
      throw new ComethError(
        `Failed to create cometh at coordinates (${cometh.coordinates.row}, ${cometh.coordinates.column}): ${error}`
      );
    }
  }

  /**
   * Deletes a cometh at the specified coordinates
   * @param cometh - The cometh to be deleted
   * @throws ComethError if deleting the cometh fails
   */
  public async deleteCometh(cometh: Cometh): Promise<void> {
    try {
      const url = `${this.config.apiBaseUrl}/comeths`;
      const body = {
        row: cometh.coordinates.row,
        column: cometh.coordinates.column,
        candidateId: this.config.candidateId,
      };
      const response = await this.config.axiosInstance.delete(url, { data: body });
      await response.data;
    } catch (error) {
      console.error(error);
      throw new ComethError(
        `Failed to delete cometh at coordinates (${cometh.coordinates.row}, ${cometh.coordinates.column}): ${error}`
      );
    }
  }
}