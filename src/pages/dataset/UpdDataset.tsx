import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Stack,
  Autocomplete,
} from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { DateField } from "@mui/x-date-pickers/DateField";
import { LoadingButton } from "@mui/lab";
import { useMutation, useQuery } from "@tanstack/react-query";
import { postQueryFn } from "../../queries/postQueryFn";
import { useSnackbar } from "notistack";
import {
  create_dataset_url,
  dataset_detail_url,
  upd_dataset_url,
} from "../../constants/url";
import { on } from "events";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { queryFn } from "../../queries/queryFn";
export default function UpdDataset() {
  const [info, setInfo] = useState<{
    name?: string;
    description?: string;
    date?: string;
    tags?: string[];
  }>({});

  const { datasetId } = useParams();

  const [tempValue, setTempValue] = useState<string | null>(null);
  const { mutate, isPending, isError, isSuccess, data } = useMutation({
    mutationFn: postQueryFn,
  });

  const {
    data: dateset,
    isSuccess: getSuccess,
    isLoading: getLoading,
  } = useQuery({
    queryKey: [dataset_detail_url + "/" + datasetId],
    queryFn: queryFn,
  });

  useEffect(() => {
    if (getSuccess) {
      const data = dateset.data.data;
      setInfo({
        name: data.dataSetName,
        description: data.taskInfo,
        date: data.schedule,
        tags: data.objects,
      });
    }
  }, [getSuccess]);

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const handleCreate = () => {
    if (
      info.date === undefined ||
      info.name === undefined ||
      info.description === undefined ||
      info.tags === undefined
    ) {
      enqueueSnackbar("请填写完整信息", { variant: "error" });
      return;
    }
    mutate({
      data: {
        name: info.name,
        description: info.description,
        endTime: info.date,
        tags: info.tags,
      },
      url: upd_dataset_url + "/" + datasetId,
      method: "put",
    });
  };

  useEffect(() => {
    if (isSuccess) {
      enqueueSnackbar("更新成功", { variant: "success" });
      console.log(data.data.data.dataSetId);
      navigate(`/dataset/detail/${data.data.data.dataSetId}`);
    }
  }, [isSuccess]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box sx={{ width: "800px", maxWidth: "90%" }}>
        <Typography component="h1" variant="h5">
          修改数据集信息
        </Typography>
        <Box component="form" sx={{ mt: 1 }}>
          <TextField
            variant="standard"
            margin="normal"
            required
            fullWidth
            id="name"
            label="数据集名称"
            name="name"
            autoComplete="name"
            autoFocus
            value={info?.name}
            onChange={(e) => {
              setInfo({ ...info, name: e.target.value });
            }}
          />
          <TextField
            variant="standard"
            margin="normal"
            required
            fullWidth
            id="description"
            label="数据集描述"
            name="description"
            autoComplete="description"
            value={info?.description}
            onChange={(e) => {
              setInfo({ ...info, description: e.target.value });
            }}
          />
          {/* <Box sx={{}}> */}
          <DateField
            required
            margin="normal"
            variant="standard"
            fullWidth
            label="截止时间"
            format="YYYY年MM月DD日"
            value={dayjs(info?.date)}
            onChange={(date) => {
              console.log(date?.format("YYYY-MM-DD"));
              setInfo({ ...info, date: date?.format("YYYY-MM-DD") });
            }}
          />

          <Autocomplete
            multiple
            id="tags-standard"
            options={tempValue ? [tempValue] : []}
            getOptionLabel={(option) => option}
            value={info?.tags}
            onChange={(e, value) => {
              console.log(value);
              setInfo({ ...info, tags: value });
            }}
            renderInput={(params) => (
              <TextField
                margin="normal"
                required
                {...params}
                variant="standard"
                label="标签"
                placeholder="标注内容"
                onChange={(e) => setTempValue(e.target.value)}
              />
            )}
          />

          {/* </Box> */}
          {/* 上传数据集封面图片 */}
          {/* <Stack
          direction="row"
          spacing={2}
          sx={{ mt: 2, alignItems: 'center', paddingX: 2 }}
        >
          <div
            style={{
              width: 96,
              height: 96,
              backgroundColor: '#f0f0f0',
              borderRadius: 8,
              justifyItems: 'center',
              alignItems: 'center',
              alignContent: 'center',
              justifyContent: 'center',
              display: 'flex',
            }}
          >
            <Typography>封面预览</Typography>
          </div>
          <div style={{ flexGrow: 1 }} />
          <Stack direction="column" spacing={1}>
            <Button
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
            >
              上传封面
              <input type="file" hidden />
            </Button>
            <Typography variant="caption" color="textSecondary">
              请上传一张封面图片
            </Typography>
          </Stack>
        </Stack> */}

          <LoadingButton
            // type="submit"
            loading={isPending}
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleCreate}
          >
            修改数据集
          </LoadingButton>
        </Box>
      </Box>
    </Box>
  );
}