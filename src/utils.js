export function formatPhone(phone) {
  if (!phone) return '';
  const sanitizedPhone = phone.replace(/[^\d]/g, '');
  if (sanitizedPhone.length < 3) return sanitizedPhone;
  if (sanitizedPhone.length < 7) return `(${sanitizedPhone.slice(0, 2)}) ${sanitizedPhone.slice(2)}`;
  if (sanitizedPhone.length < 11) return `(${sanitizedPhone.slice(0, 2)}) ${sanitizedPhone.slice(2, 6)}-${sanitizedPhone.slice(6)}`;
  return `(${sanitizedPhone.slice(0, 2)}) ${sanitizedPhone.slice(2, 7)}-${sanitizedPhone.slice(7, 11)}`;
}

export function formatCPF(cpf) {
  if (!cpf) return '';
  const sanitizedCPF = cpf.replace(/[^\d]/g, '');
  if (sanitizedCPF.length < 4) return sanitizedCPF;
  if (sanitizedCPF.length < 7) return `${sanitizedCPF.slice(0, 3)}.${sanitizedCPF.slice(3)}`;
  if (sanitizedCPF.length < 10) return `${sanitizedCPF.slice(0, 3)}.${sanitizedCPF.slice(3, 6)}.${sanitizedCPF.slice(6, 9)}`;
  return `${sanitizedCPF.slice(0, 3)}.${sanitizedCPF.slice(3, 6)}.${sanitizedCPF.slice(6, 9)}-${sanitizedCPF.slice(9, 11)}`;
}

