// types/ackee-tracker.d.ts
declare module "ackee-tracker" {
  export interface AckeeOptions {
    detailed?: boolean;
    ignoreLocalhost?: boolean;
    ignoreOwnVisits?: boolean;
  }

  export interface AckeeAttributes {
    siteLocation?: string;
    siteReferrer?: string | null;
    siteLanguage?: string;
    screenWidth?: number;
    screenHeight?: number;
    screenColorDepth?: number;
    deviceName?: string;
    deviceManufacturer?: string;
  }

  export interface ActionAttributes {
    key: string;
    value?: number | null;
  }

  export interface RecordResult {
    stop: () => void;
  }

  export interface AckeeInstance {
    record(
      domainId: string,
      attributes?: AckeeAttributes,
      callback?: (recordId: string | null) => void
    ): RecordResult;

    updateRecord(recordId: string): RecordResult;

    action(
      eventId: string,
      attributes: ActionAttributes,
      callback?: (actionId: string | null) => void
    ): void;

    updateAction(actionId: string, attributes: ActionAttributes): void;
  }

  export function create(server: string, options?: AckeeOptions): AckeeInstance;

  export function detect(): void;

  export function attributes(detailed?: boolean): AckeeAttributes;
}
