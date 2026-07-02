import { render, screen, fireEvent } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import Register from "./Register";
import { BrowserRouter } from "react-router-dom";

describe("Pruebas del componente Register", () => {

    test("Debe mostrar errores cuando el formulario está vacío", async () => {

        render(
            <BrowserRouter>
                <Register />
            </BrowserRouter>
        );

        const boton = screen.getByRole("button", {
            name: /registrar/i
        });

        fireEvent.click(boton);

        expect(await screen.findByText("El usuario es requerido")).toBeInTheDocument();

        expect(screen.getByText("El correo es requerido")).toBeInTheDocument();

        expect(screen.getByText("La contraseña es requerida")).toBeInTheDocument();

        expect(screen.getByText("Confirma tu contraseña")).toBeInTheDocument();

    });
    
    test("Debe desaparecer el error del usuario cuando se escribe un nombre", async () => {

        render(
            <BrowserRouter>
                <Register />
            </BrowserRouter>
        );

        fireEvent.change(
            screen.getByPlaceholderText("usuario"),
            { target: { value: "Juan" } }
        );

        fireEvent.click(
            screen.getByRole("button", { name: /registrar/i })
        );

        expect(screen.queryByText("El usuario es requerido")).toBeNull();
    });


    test("Debe desaparecer el error del correo cuando se ingresa un correo", async () => {

        render(
            <BrowserRouter>
                <Register />
            </BrowserRouter>
        );

        fireEvent.change(
            screen.getByPlaceholderText("correo"),
            { target: { value: "juan@gmail.com" } }
        );

        fireEvent.click(
            screen.getByRole("button", { name: /registrar/i })
        );

        expect(screen.queryByText("El correo es requerido")).toBeNull();
    });


    test("Debe desaparecer el error de contraseña cuando se escribe una contraseña", async () => {

        render(
            <BrowserRouter>
                <Register />
            </BrowserRouter>
        );

        fireEvent.change(
            screen.getByPlaceholderText("contraseña"),
            { target: { value: "123456" } }
        );

        fireEvent.click(
            screen.getByRole("button", { name: /registrar/i })
        );

        expect(screen.queryByText("La contraseña es requerida")).toBeNull();
    });


    test("Debe desaparecer el error de confirmación cuando se escribe una contraseña de confirmación", async () => {

        render(
            <BrowserRouter>
                <Register />
            </BrowserRouter>
        );

        fireEvent.change(
            screen.getByPlaceholderText("confirmar contraseña"),
            { target: { value: "123456" } }
        );

        fireEvent.click(
            screen.getByRole("button", { name: /registrar/i })
        );

        expect(screen.queryByText("Confirma tu contraseña")).toBeNull();
    });


    test("Debe permitir escribir en todos los campos", () => {

        render(
            <BrowserRouter>
                <Register />
            </BrowserRouter>
        );

        const usuario = screen.getByPlaceholderText("usuario");
        const correo = screen.getByPlaceholderText("correo");
        const password = screen.getByPlaceholderText("contraseña");
        const confirmPassword = screen.getByPlaceholderText("confirmar contraseña");

        fireEvent.change(usuario, {
            target: { value: "Juan" }
        });

        fireEvent.change(correo, {
            target: { value: "juan@gmail.com" }
        });

        fireEvent.change(password, {
            target: { value: "123456" }
        });

        fireEvent.change(confirmPassword, {
            target: { value: "123456" }
        });

        expect(usuario.value).toBe("Juan");
        expect(correo.value).toBe("juan@gmail.com");
        expect(password.value).toBe("123456");
        expect(confirmPassword.value).toBe("123456");
    });
    test("No debería permitir registrar si las contraseñas son diferentes", async () => {

        render(
            <BrowserRouter>
                <Register />
            </BrowserRouter>
        );
    
        fireEvent.change(
            screen.getByPlaceholderText("usuario"),
            { target: { value: "Juan" } }
        );
    
        fireEvent.change(
            screen.getByPlaceholderText("correo"),
            { target: { value: "juan@gmail.com" } }
        );
    
        fireEvent.change(
            screen.getByPlaceholderText("contraseña"),
            { target: { value: "123456" } }
        );
    
        fireEvent.change(
            screen.getByPlaceholderText("confirmar contraseña"),
            { target: { value: "654321" } }
        );
    
        fireEvent.click(
            screen.getByRole("button", { name: /registrar/i })
        );
    
        expect(
            screen.getByText("Las contraseñas no coinciden")
        ).toBeTruthy();
    
    });
});