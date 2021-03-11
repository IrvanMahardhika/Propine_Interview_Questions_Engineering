export interface ReturnValue<T = void> {
  status: 'SUCCESS' | 'FAILED' | 'VALID' | 'INVALID' | 'NOT_FOUND' | 'ERROR';
  message: string;
  data?: T;
  errors?: string[];
}

export function instanceOfReturnValue(object: any): object is ReturnValue<any> {
  return Boolean(
    object.status &&
      ['SUCCESS', 'FAILED', 'VALID', 'INVALID', 'NOT_FOUND', 'ERROR'].includes(
        object.status,
      ),
  );
}
