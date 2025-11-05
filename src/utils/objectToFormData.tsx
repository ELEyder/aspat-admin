export function objectToFormData(
  obj: Record<string, any>,
  form?: FormData,
  namespace?: string
): FormData {
  const formData = form || new FormData();

  for (const key in obj) {
    if (!Object.prototype.hasOwnProperty.call(obj, key)) continue;
    const value = obj[key];
    if (value === undefined || value === null) continue;

    const formKey = namespace ? `${namespace}[${key}]` : key;

    if (value instanceof File || value instanceof Blob) {
      formData.append(formKey, value);
    } else if (Array.isArray(value)) {
      value.forEach((item, index) => {
        const arrayKey = `${formKey}[${index}]`;
        if (item instanceof File || item instanceof Blob) {
          formData.append(arrayKey, item);
        } else if (typeof item === "object") {
          objectToFormData(item, formData, arrayKey);
        } else {
          formData.append(arrayKey, String(item));
        }
      });
    } else if (typeof value === "object") {
      objectToFormData(value, formData, formKey);
    } else {
      formData.append(formKey, String(value));
    }
  }

  if (!formData.has("_method")) {
    formData.append("_method", "PUT");
  }

  return formData;
}
