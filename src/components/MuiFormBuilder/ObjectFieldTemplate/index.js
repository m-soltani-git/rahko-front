import Grid from "@mui/material/Grid";
import {
  canExpand,
  descriptionId,
  getTemplate,
  getUiOptions,
  titleId,
} from "@rjsf/utils";

/** The `ObjectFieldTemplate` is the template to use to render all the inner properties of an object along with the
 * title and description if available. If the object is expandable, then an `AddButton` is also rendered after all
 * the properties.
 *
 * @param props - The `ObjectFieldTemplateProps` for this component
 */
export default function ObjectFieldTemplate(props) {
  const {
    description,
    title,
    properties,
    required,
    disabled,
    readonly,
    uiSchema,
    idSchema,
    schema,
    formData,
    onAddClick,
    registry,
  } = props;
  const uiOptions = getUiOptions(uiSchema);
  const TitleFieldTemplate = getTemplate(
    "TitleFieldTemplate",
    registry,
    uiOptions
  );
  const DescriptionFieldTemplate = getTemplate(
    "DescriptionFieldTemplate",
    registry,
    uiOptions
  );
  // Button templates are not overridden in the uiSchema
  const {
    ButtonTemplates: { AddButton },
  } = registry.templates;
  return (
    <>
      {title && (
        <TitleFieldTemplate
          id={titleId(idSchema)}
          title={title}
          required={required}
          schema={schema}
          uiSchema={uiSchema}
          registry={registry}
        />
      )}
      {description && (
        <DescriptionFieldTemplate
          id={descriptionId(idSchema)}
          description={description}
          schema={schema}
          uiSchema={uiSchema}
          registry={registry}
        />
      )}
      <Grid container={true} spacing={2} style={{ marginTop: "10px" }}>
        {properties.map((element, index) =>
          // Remove the <Grid> if the inner element is hidden as the <Grid>
          // itself would otherwise still take up space.
          element.hidden ? (
            element.content
          ) : (
            <Grid
              item={true}
              xs={12}
              key={index}
              style={{ marginBottom: "10px" }}
            >
              {element.content}
            </Grid>
          )
        )}
        {canExpand(schema, uiSchema, formData) && (
          <Grid container justifyContent="flex-end">
            <Grid item={true}>
              <AddButton
                className="object-property-expand"
                onClick={onAddClick(schema)}
                disabled={disabled || readonly}
                uiSchema={uiSchema}
                registry={registry}
              />
            </Grid>
          </Grid>
        )}
      </Grid>
    </>
  );
}
