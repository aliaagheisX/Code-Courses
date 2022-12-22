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
  username: '',
  firstName: '',
  lastName: '',
  email: '',
  bio: '',
});


export const addArticleInitialValues = (id) => ({
  image: '',
  title: '',
  description: '',
  body: '',
  topics: [],
  'instructor_id': id
});

export const editArticleInitialValues = (id, body) => ({
  image: null,
  title: '',
  description: '',
  body: body,
  topics: [],
  'id': id
});


export const addCourseInitialValues = (id) => ({
  image: '',
  title: '',
  description: '',
  pre: '',
  topics: [],
  'instructor_id': id
});

export const changePasswordInitialValues = {
  password: '',
  confirmPassword: '',
};

export const addCommentInitialValues = {
  comment: '',
  r_id: null
}

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


export const AddArticleSchema = Yup.object().shape({
  image: Yup.mixed(),
  title: Yup.string().required('must enter')
    .min(2, "at least 2 characters")
    .max(25, "at most 25 characters"),

  description: Yup.string().required('must enter')
    .min(20, "at least 20 characters")
    .max(150, "at most 150 characters"),
  body: Yup.string().required('must enter')
    .min(20, "at least 20 characters")
    .max(5000000, "at most 5000000 characters"),

  topics: Yup.array().min(1, "at least 1").required("required")
});

export const EditArticleSchema = Yup.object().shape({
  image: Yup.mixed(),

  title: Yup.string()
    .min(2, "at least 2 characters")
    .max(50, "at most 50 characters"),

  description: Yup.string()
    .min(20, "at least 20 characters")
    .max(150, "at most 150 characters"),

  body: Yup.string()
    .min(20, "at least 20 characters")
    .max(5000000, "at most 5000000 characters"),

  topics: Yup.array().min(1, "at least 1")
});

export const AddCourseSchema = Yup.object().shape({
  image: Yup.mixed(),
  title: Yup.string().required('must enter')
    .min(2, "at least 2 characters")
    .max(25, "at most 25 characters"),

  description: Yup.string().required('must enter')
    .min(20, "at least 20 characters")
    .max(150, "at most 150 characters"),

  pre: Yup.string()
    .min(3, "at least 3 characters")
    .max(256, "at most 256 characters"),

  topics: Yup.array().min(1, "at least 1").required("required")
});
export const AddCommentSchema = Yup.object().shape({
  comment: Yup.string().min(6).max(255).required(),
  r_id: Yup.number().nullable()
});


export const EditeCommentSchema = Yup.object().shape({
  new_comment: Yup.string().min(6).max(255).required()
});


