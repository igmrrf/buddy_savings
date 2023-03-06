import {
  encryptPassword,
  comparePassword,
  generateJwtToken,
  decryptJwtToken,
} from '../utils/modifiers';

let passwordEncrypted = '';
const password = 'some_random_password';
const secret = 'test_secret';
const algorithm = 'HS256';
let token = '';

describe('Encrypt password', () => {
  it('should generate encrypted password', () => {
    const result = encryptPassword(password);
    passwordEncrypted = result;
    expect(typeof password).toBe('string');
  });
});

describe('Compare password and hash', () => {
  it('should compare password and return boolean', () => {
    const result = comparePassword({
      password,
      hash: passwordEncrypted,
    });

    expect(typeof result).toBe('boolean');
  });

  it('should be true if both match', () => {
    const result = comparePassword({
      password,
      hash: passwordEncrypted,
    });

    expect(result).toBe(true);
  });

  it('should be false if both do not match', () => {
    const result = comparePassword({
      password: 'some_other_random_password',
      hash: passwordEncrypted,
    });

    expect(result).toBe(false);
  });
});

describe('Generate authentication token', () => {
  it(`should generate ${algorithm} token`, () => {
    token = generateJwtToken({
      customerId: 'francis',
      secret,
      algorithm,
    });

    expect(typeof token).toBe('string');
  });
});

describe('decrypt authentication token', () => {
  it('should decode token', () => {
    const result = decryptJwtToken({
      token,
      secret,
    });

    expect(typeof token).toBe('string');
  });

  it('should error out if secret in incorrect', () => {
    try {
      const result = decryptJwtToken({
        token,
        secret: 'sdkjsh',
      });
    } catch (error: any) {
      expect(error.message).toBe('invalid signature');
    }
  });

  it('should decode customerId from token', () => {
    const result: any = decryptJwtToken({
      token,
      secret,
    });

    expect(result).toHaveProperty('customerId');
    expect(result?.customerId).toBe('francis');
  });
});
