import React, {
  forwardRef,
  useCallback,
  useContext,
  ReactElement,
  useImperativeHandle,
} from 'react';
import { useForm as useReactHookForm, get } from 'react-hook-form';
// eslint-disable-next-line import/no-cycle
import { Input } from './Input';
// eslint-disable-next-line import/no-cycle
import { Error } from './Error';
// eslint-disable-next-line import/no-cycle
import { Label } from './Label';
import { FieldWrapper } from './FieldWrapper';
import { FormProps, FormContext, OnSubmitData, BaseEvent, OnErrorErrors } from './Form.types';
// eslint-disable-next-line import/no-cycle
import { ControlledInput } from './ControlledInput';
// eslint-disable-next-line import/no-cycle
import { FieldArray } from './FieldArray';

const FormReactContext = React.createContext<FormContext>({
  register: () => ({
    onChange: () => Promise.resolve(),
    onBlur: () => Promise.resolve(),
    ref: () => {},
    name: '',
  }),
  errors: {},
  reset: () => {},
  clearErrors: () => {},
  setError: () => {},
  hasError: () => false,
  unregister: () => {},
  trigger: () => new Promise<boolean>((resolve) => resolve(true)),
  setFocus: () => {},
  setValue: () => {},
  formState: {
    isValidating: false,
    isDirty: false,
    isSubmitSuccessful: false,
    isSubmitted: false,
    isSubmitting: false,
    isValid: false,
    errors: {},
    submitCount: 0,
    dirtyFields: {},
    touchedFields: {},
  },
  resetField: () => {},
  getFieldState: () => ({
    invalid: false,
    isDirty: false,
    isTouched: false,
  }),
});

export const useForm = () => useContext(FormReactContext);

export type CompoundComponent = {
  Input: typeof Input;
  ControlledInput: typeof ControlledInput;
  Error: typeof Error;
  Label: typeof Label;
  FieldWrapper: typeof FieldWrapper;
  FieldArray: typeof FieldArray;
} & (<FormValues>(
  props: FormProps<FormValues> & { ref?: React.Ref<FormContext<FormValues>> }
) => ReactElement);

export const Form = forwardRef(
  <FormValues,>(
    {
      children,
      mode = 'onSubmit',
      reValidateMode = 'onChange',
      defaultValues,
      onSubmit,
      onError,
      ...rest
    }: FormProps<FormValues>,
    ref?: React.Ref<FormContext<FormValues>>
  ) => {
    const {
      register,
      handleSubmit,
      watch,
      formState,
      getValues,
      reset,
      clearErrors,
      setError,
      unregister,
      trigger,
      control,
      setFocus,
      setValue,
      resetField,
      getFieldState,
    } = useReactHookForm<FormValues>({
      mode,
      reValidateMode,
      defaultValues,
      ...rest,
    });

    const hasError = useCallback(
      (name: string) => !!get(formState.errors, name),
      [formState.errors]
    );

    const values: FormContext<FormValues> = {
      register,
      errors: formState.errors,
      defaultValues,
      reset,
      watch,
      getValues,
      clearErrors,
      setError,
      hasError,
      unregister,
      trigger,
      control,
      setFocus,
      setValue,
      formState,
      resetField,
      getFieldState,
    };

    useImperativeHandle(ref, () => values, [values]);

    const onSubmitCallback = useCallback(
      (data: OnSubmitData<FormValues>, event?: BaseEvent) => {
        if (onSubmit) {
          // @ts-ignore
          onSubmit(data, event, values);
        }
      },
      [onSubmit]
    );

    const onErrorCallback = useCallback(
      (_errors: OnErrorErrors<FormValues>, event?: BaseEvent) => {
        if (onError) {
          // @ts-ignore
          onError(_errors, event, values);
        }
      },
      [onError]
    );

    const formHandleSubmit = handleSubmit(onSubmitCallback ?? (() => {}), onErrorCallback);

    return (
      <form onSubmit={formHandleSubmit}>
        {/* @ts-ignore */}
        <FormReactContext.Provider value={values}>
          {typeof children === 'function'
            ? // @ts-ignore
              children({ ...values, handleSubmit: formHandleSubmit })
            : children}
        </FormReactContext.Provider>
      </form>
    );
  }
) as unknown as CompoundComponent;

Form.Input = Input;
Form.ControlledInput = ControlledInput;
Form.Error = Error;
Form.Label = Label;
Form.FieldWrapper = FieldWrapper;
Form.FieldArray = FieldArray;
