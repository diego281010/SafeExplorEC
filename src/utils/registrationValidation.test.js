import { describe, expect, it } from 'vitest';
import { findDuplicateUser, validateEmail, validatePassword, validateUsername } from './registrationValidation';

describe('registrationValidation', () => {
  it('valida correos correctos e incorrectos', () => {
    expect(validateEmail('usuario@example.com')).toBe(true);
    expect(validateEmail('usuario@example')).toBe(false);
    expect(validateEmail('usuario@')).toBe(false);
  });

  it('valida nombres de usuario con formato simple', () => {
    expect(validateUsername('nicolay_01')).toBe(true);
    expect(validateUsername('ab')).toBe(false);
    expect(validateUsername('usuario con espacio')).toBe(false);
  });

  it('valida contraseñas mínimas', () => {
    expect(validatePassword('123456')).toBe(true);
    expect(validatePassword('12345')).toBe(false);
  });

  it('detecta duplicados por email o username', () => {
    const users = [
      { email: 'ana@example.com', nombre: 'Ana' },
      { email: 'pedro@example.com', nombre: 'Pedro' },
    ];

    expect(findDuplicateUser({ email: 'ana@example.com', username: 'Carlos' }, users)).toEqual({
      emailExists: true,
      usernameExists: false,
    });

    expect(findDuplicateUser({ email: 'nuevo@example.com', username: 'pedro' }, users)).toEqual({
      emailExists: false,
      usernameExists: true,
    });
  });
});
