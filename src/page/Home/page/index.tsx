import { Button, ButtonProps, Grid, Typography } from "@mui/material";
import { useAppSelector } from "../../../app/hooks";
import {
  Col,
  Row,
  UiButton,
  UiLoadingButton,
} from "../../../components/elements";
import { selectRoutes } from "../../../redux/app/appSlice";
import {
  useForm,
  UseFormGetFieldState,
  UseFormGetValues,
  UseFormResetField,
  UseFormSetError,
  UseFormSetValue,
  UseFormTrigger,
} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useEffect, useState } from "react";
import {
  CheckboxField,
  InputField,
  RadioField,
} from "../../../components/FormControl";
import SelectField from "../../../components/FormControl/SelectField";

interface ProductProps {
  productName: string;
  price: number;
  color: string;
  category: string;
}

const HandleHookFromApi = (
  field: string,
  valueOfSetValue?: string,
  resetField?: UseFormResetField<any>,
  trigger?: UseFormTrigger<any>,
  getValues?: UseFormGetValues<any>,
  getFieldState?: UseFormGetFieldState<any>,
  setValue?: UseFormSetValue<any>,
  setError?: UseFormSetError<any>
) => {
  return (
    <Row sx={{ padding: "10px 0px" }}>
      {resetField && (
        <Typography
          onClick={() => resetField(field)}
          sx={{
            marginLeft: "10px",
            cursor: "pointer",
            textDecoration: "underline",
          }}
        >
          Reset Field
        </Typography>
      )}
      {trigger && (
        <Typography
          onClick={async () => {
            const result = await trigger(field);
            console.log("Trigger", field, ":", result);
          }}
          sx={{
            marginLeft: "10px",
            cursor: "pointer",
            textDecoration: "underline",
          }}
        >
          Trigger
        </Typography>
      )}
      {getValues && (
        <Typography
          onClick={() => {
            const values = getValues(field);
            console.log("values:", values);
          }}
          sx={{
            marginLeft: "10px",
            cursor: "pointer",
            textDecoration: "underline",
          }}
        >
          Get value
        </Typography>
      )}
      {setValue && (
        <Typography
          onClick={() => {
            setValue(field, valueOfSetValue);
          }}
          sx={{
            marginLeft: "10px",
            cursor: "pointer",
            textDecoration: "underline",
          }}
        >
          Set value
        </Typography>
      )}
      {getFieldState && (
        <Typography
          onClick={() => {
            console.log(getFieldState(field));
          }}
          sx={{
            marginLeft: "10px",
            cursor: "pointer",
            textDecoration: "underline",
          }}
        >
          Field State
        </Typography>
      )}
      {setError && (
        <Typography
          onClick={() => {
            setError(
              field,
              { type: "error", message: "Set Error" },
              { shouldFocus: true }
            );
          }}
          sx={{
            marginLeft: "10px",
            cursor: "pointer",
            textDecoration: "underline",
          }}
        >
          Set Error
        </Typography>
      )}
    </Row>
  );
};

const ButtonStyle = ({ children, sx, onClick }: ButtonProps) => {
  return (
    <Button
      onClick={onClick}
      variant="contained"
      sx={{
        marginBottom: "10px",
        minWidth: "100px",
        textTransform: "none",
        padding: "10px 0px",
        borderRadius: "12px",
        color: "black",
        ...sx,
      }}
    >
      {children}
    </Button>
  );
};

const HomePage = () => {
  // const listRouter = useAppSelector(selectRoutes);
  const [products, setProducts] = useState<ProductProps[]>([]);
  const optionsColor = [
    { value: "red", label: "Red", color: "red" },
    { value: "green", label: "Green", color: "green" },
  ];
  const optionCategories = [
    { value: "bag", label: "Bag" },
    { value: "shield", label: "Shield" },
    { value: "short", label: "Short" },
  ];

  const initialValues: any = {
    productName: "",
    price: "",
    termsOfService: false,
    color: "",
    category: "",
  } as any;
  const schema = yup
    .object({
      productName: yup.string().required("Please fill in your email address"),
      price: yup
        .number()
        .integer()
        .min(0)
        .required("Please fill in price product"),
      termsOfService: yup
        .boolean()
        .required("The terms and conditions must be accepted.")
        .oneOf([true], "The terms and conditions must be accepted."),
      color: yup
        .string()
        .required("Color must be choose")
        .oneOf(["green", "red"], "Color must be choose"),
      category: yup
        .string()
        .required("Category must be choose")
        .oneOf(["bag", "shield", "short"], "Category invalid"),
    })
    .required();

  const {
    control,
    handleSubmit,
    reset,
    resetField,
    clearErrors,
    getValues,
    getFieldState,
    setValue,
    trigger,
    watch,
    register,
    setFocus,
    setError,
    formState: { isSubmitting, submitCount },
  } = useForm<any>({
    defaultValues: initialValues,
    resolver: yupResolver(schema),
  });

  // const watchShowAge = watch("showAge", false);
  // const watchAllFields = watch();
  // const watchFields = watch(["showAge", "number"]);
  useEffect(() => {
    setFocus("price");
  }, [setFocus]);

  const handleFormSubmit = (formValue: ProductProps) => {
    setProducts((prev: ProductProps[]) => [
      ...prev!,
      {
        productName: formValue.productName,
        price: formValue.price,
        color: formValue.color,
        category: formValue.category,
      },
    ]);
    // resetField("productName");
    // resetField("price");
    reset();
  };
  console.log("render");
  // console.log("watchShowAge:", watchShowAge);
  // useEffect(() => {
  //   const subscription = watch((value, { name, type }) =>
  //     console.log(value, name, type)
  //   );
  //   return () => subscription.unsubscribe();
  // }, [watch]);

  return (
    <Col
      sx={{ height: "100vh", alignItems: "center", justifyContent: "center" }}
    >
      <Col sx={{ margin: "0 50px", width: "100%" }}>
        <Grid container spacing={4} sx={{ justifyContent: "center" }}>
          <Grid item xs={5}>
            <Typography>Submit Count:{submitCount}</Typography>
            <form onSubmit={handleSubmit(handleFormSubmit)}>
              <Col>
                <InputField
                  name="productName"
                  control={control}
                  label="Product Name"
                  placeholder="Enter Product Name "
                />
                {HandleHookFromApi(
                  "productName",
                  "Thanh",
                  resetField,
                  trigger,
                  getValues,
                  getFieldState,
                  setValue,

                  setError
                )}
                <InputField
                  name="price"
                  control={control}
                  label="Price Product"
                  placeholder="Enter Price Product"
                />
                {HandleHookFromApi(
                  "price",
                  "12",
                  resetField,
                  trigger,
                  getValues,
                  getFieldState,
                  setValue,
                  setError
                )}
                {/* <input type="checkbox" {...register("showAge")} /> */}
                <RadioField
                  name="color"
                  control={control}
                  label="Choose color you want to display"
                  options={optionsColor}
                />
                <SelectField
                  name="category"
                  control={control}
                  label="Choose category of product"
                  options={optionCategories}
                />
                <CheckboxField
                  name="termsOfService"
                  control={control}
                  label="Terms Of Service"
                />
                <UiLoadingButton
                  isLoading={isSubmitting}
                  isSubmitting={isSubmitting}
                >
                  Add Product
                </UiLoadingButton>
                <ButtonStyle onClick={() => clearErrors()}>
                  Clear Error
                </ButtonStyle>
                <ButtonStyle onClick={() => reset()}>Reset Form</ButtonStyle>
              </Col>
            </form>
          </Grid>
          <Grid item xs={6}>
            {products.map((product: ProductProps) => {
              return (
                <Row sx={{ alignItems: "center", marginBottom: "10px" }}>
                  <Typography>
                    <span style={{ fontWeight: "bold", fontSize: "1.15em" }}>
                      Product Name:
                    </span>
                    {product.productName}-
                    <span style={{ fontWeight: "bold", fontSize: "1.15em" }}>
                      Price
                    </span>
                    :{product.price}-
                    <span style={{ fontWeight: "bold", fontSize: "1.15em" }}>
                      Color
                    </span>
                    :{product.color}-
                    <span style={{ fontWeight: "bold", fontSize: "1.15em" }}>
                      Category
                    </span>
                    :{product.category}
                  </Typography>
                </Row>
              );
            })}
          </Grid>
        </Grid>
      </Col>
    </Col>
  );
};

export default HomePage;
