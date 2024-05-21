export class ForbiddenError extends Error {
  errorStatus: string;
  response: Response;

  constructor(errorStatus: string, response: Response) {
    // On passe les arguments restants (y compris ceux
    // de l'éditeur tiers) au constructeur parent
    super(errorStatus);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ForbiddenError);
    }
    // On garde la pile d'appels de l'erreur
    // Uniquement disponible pour V8
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ForbiddenError);
    }
    this.name = "Une erreur est survenue";
    // Les informations de débogage spécifiques
    this.errorStatus = errorStatus;

    this.response = response;
  }
}

// Ecoute des statuts
async function checkStatus(res: Response) {
  if (res.status === 200) {
    return res.json();
  }
  if (res.status === 201) {
    return res.json();
  }

  if (res.status === 204) {
    return null;
  }
  if (res.status === 401) {
    throw new ForbiddenError("Forbidden acces", res);
  }
  if (res.status === 404) {
    throw new Error("Not Found");
  }
}

//Creation d'un fonction request -> Appel d'api
export async function request<T>(url: string, options?: RequestInit) {
  const prefix = import.meta.env.VITE_BACK_URL;
  const finalUrl = `${prefix}${url}`;
  const result = fetch(finalUrl, { ...options, credentials: "include" }).then(
    checkStatus,
  );
  return result as T;
}

export function parseLink(obj: string) {
  const truncateLink = Number.parseInt(obj.split("/").slice(-2, -1)[0]);
  return truncateLink;
}
