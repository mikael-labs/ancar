import { cpf as cpfValidator } from "cpf-cnpj-validator";

export const isCpfValid = (cpf = "") => cpfValidator.isValid(cpf);
