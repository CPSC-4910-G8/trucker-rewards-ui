export const validateInput = (object) => {
  for (const [key, value] of Object.entries(object)) {
    console.log(`${key}: ${value}`);
    if (value === "" || value === undefined || value === null) return false;
  }
  return true;
};

export const mergeApplications = (sponsors, applications) => {
  if (applications != null) {
    const sponsor_map = {};
    sponsors.map(({ id, name }) => (sponsor_map[id] = name));
    const statuses = applications.map((application) => {
      return {
        name: sponsor_map[application.sponsor_id],
        application_status: application.application_status,
      };
    });

    const ids = [
      ...new Set([
        ...sponsors.map((e) => e.name),
        ...statuses.map((e) => e.name),
      ]),
    ];
    console.log(ids);

    const result = ids.map((e) => {
      const obj = {
        ...sponsors.find((o) => o.name === e),
        ...statuses.find((o) => o.name === e),
      };

      if (obj.name && obj._id) delete obj._id;

      return obj;
    });
    console.log(result);
    return result;
  }
};