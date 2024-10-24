import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Form from "./Form";
import { MemoryRouter } from "react-router-dom";

describe("Form Component", () => {
  // Prueba para mostrar el error si las políticas no están aceptadas
  test("shows error if policies are not accepted", async () => {
    render(
      <MemoryRouter>
        <Form onSubmit={jest.fn()} />
      </MemoryRouter>
    );

    const submitButton = screen.getByText("Cotiza aquí");
    fireEvent.click(submitButton);

    const errorMessage = await waitFor(() =>
      screen.findByText("Debes aceptar ambas políticas.")
    );
    expect(errorMessage).toBeInTheDocument();
  });

  // Prueba para abrir el modal al hacer clic en el link de términos y condiciones
  // Prueba para abrir el modal al hacer clic en el link de términos y condiciones
  test("opens modal when terms and conditions link is clicked", async () => {
    render(
      <MemoryRouter>
        <Form onSubmit={jest.fn()} />
      </MemoryRouter>
    );

    const termsLink = screen.getByText("Aplican Términos y Condiciones.");
    fireEvent.click(termsLink);

    // Busca texto dentro del modal para confirmar que está visible
    const modalText = await screen.findByText(
      /encontrarás información importante/i
    );
    expect(modalText).toBeInTheDocument();
  });

  // Prueba para enviar el formulario cuando todos los campos están correctos y las políticas aceptadas
  test('submits the form when all fields are valid and policies are accepted', async () => {
    const mockOnSubmit = jest.fn();
  
    render(
      <MemoryRouter>
        <Form onSubmit={mockOnSubmit} />
      </MemoryRouter>
    );
  
    // Completar el DNI válido y el celular válido
    fireEvent.change(screen.getByPlaceholderText('Nro. de documento'), { target: { value: '30216147' } });
    fireEvent.change(screen.getByPlaceholderText('Celular'), { target: { value: '987654321' } });
  
    // Aceptar las políticas
    fireEvent.click(screen.getByLabelText(/Política de Privacidad/i));
    fireEvent.click(screen.getByLabelText(/Política Comunicaciones Comerciales/i));
  
    const submitButton = screen.getByText('Cotiza aquí');
    fireEvent.click(submitButton);
  
    // Esperar a que se llame la función onSubmit
    await waitFor(() => expect(mockOnSubmit).toHaveBeenCalledTimes(1));
  });
  
  

  // Prueba para no enviar el formulario si el número de celular es inválido
  test("shows error if phone number is invalid", async () => {
    render(
      <MemoryRouter>
        <Form onSubmit={jest.fn()} />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText("Nro. de documento"), {
      target: { value: "30216147" },
    });
    fireEvent.change(screen.getByPlaceholderText("Celular"), {
      target: { value: "123456" },
    }); // Celular inválido

    fireEvent.click(screen.getByLabelText(/Política de Privacidad/i));
    fireEvent.click(
      screen.getByLabelText(/Política Comunicaciones Comerciales/i)
    );

    const submitButton = screen.getByText("Cotiza aquí");
    fireEvent.click(submitButton);

    const errorMessage = await waitFor(() =>
      screen.findByText("El número de celular no es válido.")
    );
    expect(errorMessage).toBeInTheDocument();
  });

  // Prueba para no enviar el formulario si el DNI es incorrecto
  test("shows error if DNI is invalid", async () => {
    render(
      <MemoryRouter>
        <Form onSubmit={jest.fn()} />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText("Nro. de documento"), {
      target: { value: "12345678" },
    }); // DNI inválido
    fireEvent.change(screen.getByPlaceholderText("Celular"), {
      target: { value: "987654321" },
    });

    fireEvent.click(screen.getByLabelText(/Política de Privacidad/i));
    fireEvent.click(
      screen.getByLabelText(/Política Comunicaciones Comerciales/i)
    );

    const submitButton = screen.getByText("Cotiza aquí");
    fireEvent.click(submitButton);

    const errorMessage = await waitFor(() =>
      screen.findByText("El usuario no existe.")
    );
    expect(errorMessage).toBeInTheDocument();
  });
});
