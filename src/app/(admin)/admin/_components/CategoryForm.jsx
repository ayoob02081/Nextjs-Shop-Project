import Loading from "@/components/Loading";
import TextField from "@/ui/TextField";
import Select from "react-select";

const categoryFormData = [
  {
    id: 1,
    label: "عنوان",
    name: "title",
  },
  {
    id: 2,
    label: "عنوان انگلیسی",
    name: "englishTitle",
  },
  {
    id: 3,
    label: "توضیحات",
    name: "description",
  },
];

export const categoryTypes = [
  {
    id: 1,
    label: "محصول",
    name: "product",
  },
  {
    id: 2,
    label: "پست",
    name: "post",
  },
  {
    id: 3,
    label: "تیکت",
    name: "ticket",
  },
  {
    id: 4,
    label: "نظرات",
    name: "comment",
  },
];

function CategoryForm({
  formData,
  onSubmit,
  handleChange,
  setSelectedType,
  selectedType,
  isPending,
}) {
  return (
    <form className="form" onSubmit={onSubmit}>
      {categoryFormData.map((item) => (
        <TextField
          key={item.id}
          label={item.label}
          name={item.name}
          value={formData[item.name] || ""}
          onChange={handleChange}
        />
      ))}
      <div>
        <label htmlFor="type" className="text-secondary-600 text-lg mb-4">
          نوع
        </label>
        <Select
          instanceId="type"
          onChange={setSelectedType}
          options={categoryTypes}
          defaultValue={selectedType}
        />
      </div>
      {isPending ? (
        <Loading />
      ) : (
        <button className="btn btn--primary">تایید</button>
      )}
    </form>
  );
}

export default CategoryForm;
