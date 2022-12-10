import * as Yup from "yup";
import YupPassword from "yup-password";

YupPassword(Yup); // extend yup

/* inital values */
export const loginInitialValues = {
  email: "",
  password: "",
};

export const signupInitialValues = {
  username: "",
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export const editProfileInitialValues = () => ({
  image: null,
  username: null,
  firstName: null,
  lastName: null,
  email: null,
  bio: null,
});

export const changePasswordInitialValues = {
  password: null,
  confirmPassword: null,
};

export const emptyInitialValues = {};

/* validation schemas */
export const LoginSchema = Yup.object().shape({
  /* email validation */
  email: Yup.string().email("please enter a valid email").required("required"),

  /* password validation */
  password: Yup.string()
    .password()
    .min(8, "at least 8 characters")
    .max(128, "at most 128 characters")
    .minLowercase(1, "at lease 1 lower case letter")
    .minUppercase(1, "at lease 1 upper case letter")
    .minNumbers(1, "at least 1 number")
    .minSymbols(1, "at lease 1 symbol")
    .required("required"),
});

export const SignupSchema = LoginSchema.shape({
  /* first name */
  firstName: Yup.string()
    .min(3, "at least 3 characters")
    .max(32, "at most 32 characters")
    .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field ")
    .required("required"),

  lastName: Yup.string()
    .min(3, "at least 3 characters")
    .max(32, "at most 32 characters")
    .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field ")
    .required("required"),

  username: Yup.string()
    .min(3, "at least 3 characters")
    .max(32, "at most 32 characters")
    .required("required"),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match"
  ),
});


export const EditProfileSchema = Yup.object().shape({
  image: Yup.mixed(),
  username: Yup.string()
    .min(3, "at least 3 characters")
    .max(32, "at most 32 characters"),

  email: Yup.string().email("please enter a valid email"),

  /* first name */
  firstName: Yup.string()
    .min(3, "at least 3 characters")
    .max(32, "at most 32 characters")
    .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field "),

  lastName: Yup.string()
    .min(3, "at least 3 characters")
    .max(32, "at most 32 characters")
    .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field "),

  about: Yup.string(),
});

export const ChangePasswordSchema = Yup.object().shape({
  password: Yup.string()
    .password()
    .min(8, "at least 8 characters")
    .max(128, "at most 128 characters")
    .minLowercase(1, "at lease 1 lower case letter")
    .minUppercase(1, "at lease 1 upper case letter")
    .minNumbers(1, "at least 1 number")
    .minSymbols(1, "at lease 1 symbol")
    .required("required"),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match"
  ).required("required"),
})

export const EmptySchema = Yup.object().shape({
})