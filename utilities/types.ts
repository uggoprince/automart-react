// type JsonValue = string | number | boolean | JsonObject | JsonObject[];
export type JsonObject = {
  [key: string]: string | number | boolean | JsonObject | JsonObject[] | object;
};

export type JSON = JSONObject | JSONArray;
export type JSONObject = { [key: string]: JSONValue };
export type JSONValue =
  | string
  | number
  | boolean
  | null
  | JSONObject
  | JSONArray;
type JSONArray = JSONValue[];

export type InputChangeEvent = React.ChangeEvent<
  HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
>;
