import { render, screen, fireEvent } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import Login from "./Login";
import { BrowserRouter } from "react-router-dom";

describe("Pruebas del componente Login", () => {

    test("Debe mostrar errores cuando el formulario está vacío", async () => {

        render(
            <BrowserRouter>
                <Login />
            </BrowserRouter>
        );

        fireEvent.click(
            screen.getByRole("button", { name: /ingresar/i })
        );

        expect(
            await screen.findByText("El email es requerido")
        ).toBeTruthy();

        expect(
            screen.getByText("La contraseña es requerida")
        ).toBeTruthy();

    });

    test("Debe permitir escribir un email", () => {

        render(
            <BrowserRouter>
                <Login />
            </BrowserRouter>
        );

        const email = screen.getByPlaceholderText("usuario");

        fireEvent.change(email, {
            target: {
                value: "correo@gmail.com"
            }
        });

        expect(email.value).toBe("correo@gmail.com");

    });

    test("Debe permitir escribir una contraseña", () => {

        render(
            <BrowserRouter>
                <Login />
            </BrowserRouter>
        );

        const password = screen.getByPlaceholderText("contraseña");

        fireEvent.change(password, {
            target: {
                value: "123456"
            }
        });

        expect(password.value).toBe("123456");

    });

    test("Debe desaparecer el error del email cuando se ingresa un valor", async () => {

        render(
            <BrowserRouter>
                <Login />
            </BrowserRouter>
        );

        fireEvent.change(
            screen.getByPlaceholderText("usuario"),
            {
                target: {
                    value: "correo@gmail.com"
                }
            }
        );

        fireEvent.click(
            screen.getByRole("button", { name: /ingresar/i })
        );

        expect(
            screen.queryByText("El email es requerido")
        ).toBeNull();

    });

    test("Debe desaparecer el error de contraseña cuando se ingresa una contraseña", async () => {

        render(
            <BrowserRouter>
                <Login />
            </BrowserRouter>
        );

        fireEvent.change(
            screen.getByPlaceholderText("contraseña"),
            {
                target: {
                    value: "123456"
                }
            }
        );

        fireEvent.click(
            screen.getByRole("button", { name: /ingresar/i })
        );

        expect(
            screen.queryByText("La contraseña es requerida")
        ).toBeNull();

    });

    test("Debe permitir llenar ambos campos simultáneamente", () => {

        render(
            <BrowserRouter>
                <Login />
            </BrowserRouter>
        );

        const email = screen.getByPlaceholderText("usuario");
        const password = screen.getByPlaceholderText("contraseña");

        fireEvent.change(email, {
            target: {
                value: "correo@gmail.com"
            }
        });

        fireEvent.change(password, {
            target: {
                value: "123456"
            }
        });

        expect(email.value).toBe("correo@gmail.com");
        expect(password.value).toBe("123456");

    });

    test("Debería mostrar error cuando el email no tiene formato válido", async () => {

        render(
            <BrowserRouter>
                <Login />
            </BrowserRouter>
        );
    
        fireEvent.change(
            screen.getByPlaceholderText("email"),
            { target: { value: "correo_invalido" } }
        );
    
        fireEvent.change(
            screen.getByPlaceholderText("contraseña"),
            { target: { value: "123456" } }
        );
    
        fireEvent.click(
            screen.getByRole("button", { name: /ingresar/i })
        );
    
        expect(
            screen.getByText("El email no es válido")
        ).toBeTruthy();
    
    });

});