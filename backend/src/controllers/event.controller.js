import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { isValidObjectId } from "mongoose";
import { Event } from "../models/event.model.js";

const createEvent = asyncHandler(async (req, res) => {
  const { title, start, end, description } = req.body;
  const userId = req.user._id;

  if (!isValidObjectId(userId)) {
    throw new ApiError(400, "Invalid user");
  }

  if (
    [title, start, end, description].some(
      (field) => field?.trim === "" || !field
    )
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const newEvent = await Event.create({
    title,
    start,
    end,
    description,
    createdBy: userId,
  });

  if (!newEvent) {
    throw new ApiError(500, "Failed to create event");
  }

  res
    .status(200)
    .json(new ApiResponse(200, newEvent, "Event created successfully"));
});

const updateEvent = asyncHandler(async (req, res) => {
  const { eventId } = req.params;
  const { title, start, end, description } = req.body;

  if (!isValidObjectId(eventId)) {
    throw new ApiError(400, "Invalid event");
  }

  if (
    [title, start, end, description].some(
      (field) => field?.trim === "" || !field
    )
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const newEvent = await Event.findByIdAndUpdate(
    eventId,
    {
      title,
      start,
      end,
      description,
    },
    {
      new: true,
    }
  );

  if (!newEvent) {
    throw new ApiError(500, "Failed to update event");
  }

  res
    .status(200)
    .json(new ApiResponse(200, newEvent, "Event updated successfully"));
});

const getEvents = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  if (!isValidObjectId(userId)) {
    throw new ApiError(400, "Invalid user");
  }

  const events = await Event.aggregate([
    {
      $match: {
        createdBy: userId,
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "createdBy",
        foreignField: "_id",
        as: "createdBy",
        pipeline: [
          {
            $project: {
              password: 0,
            },
          },
        ],
      },
    },
    {
      $unwind: "$createdBy",
    },
    {
      $sort: {
        start: 1,
      },
    },
  ]);

  if (events?.length === 0 || !events) {
    return res.status(200).json(new ApiResponse(200, {}, "No event found"));
  }

  res
    .status(200)
    .json(new ApiResponse(200, events, "Events fetched successfully"));
});

const deleteEvent = asyncHandler(async (req, res) => {
  const { eventId } = req.params;

  if (!isValidObjectId(eventId)) {
    throw new ApiError(400, "Invalid event");
  }

  const deletedEvent = await Event.findByIdAndDelete(eventId);

  if (!deletedEvent) {
    throw new ApiError(500, "Failed to delete event");
  }

  res
    .status(200)
    .json(new ApiResponse(200, deletedEvent, "Event deleted successfully"));
});

export { createEvent, updateEvent, getEvents, deleteEvent };
