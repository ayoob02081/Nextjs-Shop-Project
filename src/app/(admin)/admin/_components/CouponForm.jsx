import Loading from "@/components/Loading";
import RadioButton from "@/ui/RadioButton";
import TextField from "@/ui/TextField";
import DatePicker from "react-multi-date-picker";
import Select from "react-select";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

const couponFormData = [
  {
    id: 1,
    label: "کد",
    name: "code",
  },
  {
    id: 2,
    label: "مقدار",
    name: "amount",
  },
  {
    id: 3,
    label: "ظرفیت",
    name: "usageLimit",
  },
];

function CouponForm({
  products,
  onSubmit,
  coupon,
  handleChange,
  setProductIds,
  isPending,
  setCouponType,
  couponType,
  expireDate,
  setExpireDate,
  defaulValue = "",
}) {

  return (
    <form className="form" onSubmit={onSubmit}>
      {couponFormData.map((item) => (
        <TextField
          key={item.id}
          label={item.label}
          name={item.name}
          value={coupon[item.name] || ""}
          onChange={handleChange}
        />
      ))}
      <div>
        <label htmlFor="products" className="text-secondary-600 text-lg mb-4">
          شامل محصولات
        </label>
        <Select
          isMulti
          instanceId="products"
          options={products}
          onChange={setProductIds}
          defaultValue={
            defaulValue
          }
          getOptionLabel={(option) => option.title}
          getOptionValue={(option) => option._id}
        />
      </div>
      <div className="flex flex-col">
        <span className="text-secondary-600 text-lg mb-4">تاریخ انقضا</span>
        <DatePicker
          value={expireDate}
          onChange={setExpireDate}
          format="YYYY/MM/DD"
          calendar={persian}
          locale={persian_fa}
          inputClass="textField__input"
        />
      </div>
      <div>
        <span className="text-secondary-600 text-lg mb-4">نوع</span>
        <div className="flex items-center justify-between gap-8">
          <RadioButton
            checked={couponType === "percent"}
            id="percent-type"
            label="درصد"
            name="type"
            value="percent"
            onChange={(e) => setCouponType(e.target.value)}
          />
          <RadioButton
            checked={couponType === "fixedProduct"}
            id="fixedProduct-type"
            label="قیمت ثابت"
            name="type"
            value="fixedProduct"
            onChange={(e) => setCouponType(e.target.value)}
          />
        </div>
      </div>
      {isPending ? (
        <Loading />
      ) : (
        <button className="btn btn--primary">تایید</button>
      )}
    </form>
  );
}

export default CouponForm;
