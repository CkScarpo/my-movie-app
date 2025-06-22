import Swal from "sweetalert2";
import axios from "axios";

export function handleApiError(error: unknown): string {
  let message = "Ocorreu um erro inesperado.";

  if (axios.isAxiosError(error)) {
    if (error.response) {
      const status = error.response.status;
      const data = error.response.data;
      message = `Erro ${status}: ${
        data?.status_message || JSON.stringify(data)
      }`;
    } else if (error.request) {
      message = "Sem resposta do servidor. Verifique sua conexão.";
    } else {
      message = `Erro na requisição: ${error.message}`;
    }
  } else if (error instanceof Error) {
    message = error.message;
  }

  Swal.fire({
    icon: "error",
    title: "Ops!",
    text: message,
    confirmButtonText: "Fechar",
  });

  return message;
}
